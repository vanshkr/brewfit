# TypeScript Project-Wide Type Audit Report

This document maps all type inconsistencies, missing properties, type mismatches, and naming discrepancies across the `brewfit` codebase, concluding with a Property Naming Alignment Map, Single Source of Truth recommendations, and a Step-by-Step Resolution Plan.

---

## 1. Captured TypeScript Errors & Compilation Results
Running `npx tsc --noEmit` captures the following active type-check error in the codebase:

- **File**: `brewfit/src/features/profile/store/useProfileStore.ts` (Line 29)
- **Error Description**: `TS2345: Argument of type '(state: ProfileState) => ProfileState | { ... }' is not assignable to parameter of type ...`
- **Root Cause**: The properties inside `UserProfile` specify a strict, closed string union for gender:
  `gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say' | undefined`
  However, the profile update form fields (`EditProfileForm`) type `gender` as a generic `string`. Attempting to merge a partial form state (`Partial<EditProfileForm>`) into the `UserProfile` object fails because a generic `string` cannot be safely assigned to the strict union type of `gender`.

---

## 2. Categorized Codebase Inconsistencies

### A. Property Naming & Alias Inconsistencies
We identified properties representing the same domain concept but named differently across layers:

| Concept | File / Interface A | Property Name A | File / Interface B | Property Name B | Impact & Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Profile Photo** | `User` (Shared) | `avatarUrl` | `UserProfile` (Profile) | `avatar` | Cause mapping overhead or potential dropping of data when synchronizing user states across profiles. |
| **Customizations** | `CartItem` (Cart) | `specialInstructions` | `OrderItemSummary` (Order Summary) | `customizations` | During reordering in `useReorder.ts`, the developer is forced to explicitly map `customizations` array to `specialInstructions` to maintain parity. |
| **Order Total** | `Order` (Orders) | `total` | `OrderHistoryItem` (Profile) | `totalAmount` / `finalAmount` | Redundant aliases for the final calculated total cost. Leads to cognitive load and manual mapping bugs. |
| **Physical Address** | `Address` (Location) | `line1` / `line2` / `city` | `SavedAddress` (Checkout) | `fullAddress` | Address strings are stored as structured sub-properties in Location and raw flat strings in Checkout, violating domain uniformity. |

---

### B. Central Type vs. Usage Mismatches
Places where object instantiation doesn't align with the exact properties of the type definitions:

1. **Add-On Objects (Extra Fields)**
   - **Type Definition**: `CartItemAddon` (`src/features/cart/types/index.ts`) only permits `id`, `name`, and `price`.
   - **Actual Usage**: `ProductDetailScreen.tsx` assigns `selectedAddOns` of type `AddOn[]` directly to `CartItem.addOns`. `AddOn` carries an extra `calories?: number` parameter that is unhandled by the target interface `CartItemAddon`.
2. **Product Size Properties (Mandatory vs. Optional)**
   - **Type Definition**: `SizeOption` (`src/features/cart/types/index.ts`) declares `price?: number` as optional.
   - **Actual Usage**: `ProductDetailScreen.tsx` passes `ProductSize` as `size` which expects `price: number` as mandatory.

---

### C. Type Shape Discrepancies
Mismatches between structural representation of fields:

1. **Array of Strings rendered as a Flat Interpolated String**
   - **File**: `brewfit/src/features/cart/components/CartItemCard.tsx` (Line 73)
   - **Code**: `"{item.specialInstructions}"`
   - **Discrepancy**: `specialInstructions` is declared as a string array (`string[]`). Directly interpolating an array in curly braces and quotes without joining it (`item.specialInstructions.join(', ')`) results in raw brackets and comma representation (e.g. `["Less Sugar", "Extra Ice"]`) instead of clean text formatting.

---

### D. Enum / Union / String Literal Mismatches
Strict unions vs. open strings:

1. **Gender Type Openness Mismatch**
   - **Strict Type**: `UserProfile.gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say'`
   - **Form Type**: `EditProfileForm.gender: string`
   - **Location**: `src/features/profile/store/useProfileStore.ts`
2. **Order Status Redundancies and Misalignments**
   - **`OrderStatus` (Profile)**: `'confirmed' | 'preparing' | 'ready' | 'on_the_way' | 'delivered' | 'cancelled' | 'refunded'`
   - **`OrderStatus` (Orders)**: `'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered'`
   - **`OrderTrackingStatus` (Tracking)**: `'confirmed' | 'preparing' | 'ready' | 'picked_up' | 'on_the_way' | 'arriving' | 'delivered'`
   - **Discrepancy**: Order workflow stages use varying names and lists of statuses across checkout, order success tracking, and profile order history, making it impossible to pass an order model straight through without transform mapping.

---

### E. Duplicate Interface Definitions
Interfaces re-declared across multiple features instead of relying on a centralized domain model:

1. **Duplicate Order Interfaces**
   - `Order` (`src/features/orders/types/index.ts`) vs. `OrderHistoryItem` (`src/features/profile/types/index.ts`). Both contain order identifiers, placement timestamps, line items, and addresses, but with slightly varying structures and names.
2. **Duplicate Order Line Items**
   - `OrderItemSummary` (`src/features/profile/types/index.ts`) vs. `OrderItem` (`src/features/orders/types/index.ts`) vs. `TrackingOrderItem` (`src/features/tracking/types/index.ts`).

---

## 3. Recommended Single Source of Truth Structure
To eliminate inconsistencies, duplicate declarations should be consolidated into dedicated files in `src/shared/types/`:

1.  **`src/shared/types/user.ts`**
    - Owner of the canonical identity schema. Consolidates `User`, `UserProfile`, `UserPreferences`, and related string unions (like `Gender` and `DietaryPreference`).
2.  **`src/shared/types/order.ts`**
    - Unified tracking, historical, and checkout state structures, including a single unified `OrderStatus` type and standardized line-item types.
3.  **`src/shared/types/location.ts`**
    - Unified address models mapping structured addresses (`Address`) to serialized flat representations safely.

---

## 4. Step-by-Step Resolution Plan

We propose a safe, backward-compatible refactoring path that corrects types without breaking existing API contracts:

### Step 1: Resolve the Gender Compilation Error in `useProfileStore`
- Update `EditProfileForm` to restrict `gender` to the allowed union type or cast the assignment in `useProfileStore.ts` using a safe utility:
  ```typescript
  gender: UserProfile['gender'] | string;
  ```
  Or cast during assignment inside `useProfileStore`:
  ```typescript
  gender: data.gender as UserProfile['gender']
  ```

### Step 2: Harmonize Order Status Enums
- Standardize on a single, super-set union of `OrderStatus` in `src/shared/types/order.ts` containing:
  `'confirmed' | 'preparing' | 'ready' | 'picked_up' | 'on_the_way' | 'delivered' | 'cancelled' | 'refunded'`

### Step 3: Align `CartItem` Instructions Rendering
- Update `CartItemCard.tsx` (Line 73) to format `specialInstructions` array neatly using:
  ```tsx
  "{item.specialInstructions.join(', ')}"
  ```

### Step 4: Map and Consolidate Duplicate Models
- Gradually migrate components to import common types from `@/shared/types` instead of local features types, utilizing mapper utilities for backwards-compatibility where required.
