# Security Specification for BloxScript Hub

## Data Invariants
1. A user cannot purchase a script unless they have sufficient balance. (Handled via server-side logic in a real app, but rules should verify the purchase record is valid).
2. A user can only access `scripts/{scriptId}/private/data` if they have a document in `/purchases` with ID `{userId}_{scriptId}`.
3. User profiles are readable by the owner. Public parts (name, avatar) might be readable by others, but for now, we'll keep it strict.
4. Scripts are publicly readable.

## The Dirty Dozen Payloads (Targeting PERMISSION_DENIED)
1. Someone else trying to update my balance: `patch /users/my-id {balance: 999999}`
2. Trying to create a script with a fake author: `post /scripts {title: "Hack", authorId: "other-user"}`
3. Trying to read a script's private code without paying: `get /scripts/some-script/private/data`
4. Trying to delete a review I didn't write: `delete /scripts/script1/reviews/review-from-someone-else`
5. Trying to set myself as "admin": `patch /users/my-id {role: "admin"}`
6. Trying to inject a massive string into a script title: `post /scripts {title: "A".repeat(10000)}`
7. Trying to purchase a script for 0 dollars: `post /purchases {pricePaid: 0, scriptId: "premium-script"}` (Note: purchases should ideally be checked against script price).
8. Trying to update `createdAt` of a script: `patch /scripts/script1 {createdAt: "2020-01-01"}`
9. Trying to add a "adminOnlyField" to a script: `patch /scripts/script1 {isSuperVerified: true}`
10. Trying to list all user purchases: `get /purchases` (should only allow listing your own).
11. Trying to bypass email verification: `post /scripts ...` (if rule requires verified email).
12. Trying to spoof a purchase document ID: `post /purchases/i_didn't_pay_but_i_want_access { ... }`

## The Test Runner (Conceptual/Draft)
See `firestore.rules` for the logic implementing these protections.
