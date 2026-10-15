# Security Specification: CoalCrop Care

## 1. Data Invariants

1. **User Profiles (`/userProfiles/{userId}`)**:
   - Only authenticated users with verified emails can write or update a user profile.
   - The document ID `{userId}` and payload `userId` MUST match `request.auth.uid`.
   - Modifying someone else's profile is strictly prohibited.
   - Mandatory fields on create: `userId`, `name`, `role`.
   - Keys must be strictly validated; ghost/shadow fields are forbidden.
   - Profile reads are permitted for public researcher attribution on the educational platform.

2. **Field Observations (`/fieldObservations/{observationId}`)**:
   - Only authenticated users with verified emails can create, edit, or delete an observation.
   - `incoming().userId` MUST match `request.auth.uid`.
   - On updates, `userId` is immutable.
   - Only the creator of the observation can update or delete it.
   - Document ID must be a valid sanitized identifier (`^[a-zA-Z0-9_\-]+$`).

## 2. The Dirty Dozen Payloads (Designed to Fail)

1. **Payload 1 (Ghost Field Injection)**:
   - Target: `/userProfiles/usr_1`
   - Content: `{ userId: 'usr_1', name: 'Test', role: 'Lead', isAdmin: true }`
   - Reason for Rejection: Disallowed ghost key `isAdmin`.

2. **Payload 2 (Impersonation / Spoofing)**:
   - Target: `/userProfiles/usr_2` (User logged in as `usr_1`)
   - Content: `{ userId: 'usr_2', name: 'Impostor', role: 'Lead' }`
   - Reason for Rejection: Path `usr_2` does not match `request.auth.uid`.

3. **Payload 3 (Unauthenticated Write)**:
   - Target: `/userProfiles/anon_1` (Unauthenticated)
   - Content: `{ userId: 'anon_1', name: 'Anon', role: 'Student' }`
   - Reason for Rejection: `request.auth == null`.

4. **Payload 4 (Unverified Email Write)**:
   - Target: `/userProfiles/usr_unverified` (`email_verified: false`)
   - Content: `{ userId: 'usr_unverified', name: 'Unverified', role: 'Student' }`
   - Reason for Rejection: `request.auth.token.email_verified != true`.

5. **Payload 5 (Oversized Photo Payload / Denial of Wallet)**:
   - Target: `/userProfiles/usr_1`
   - Content: `{ userId: 'usr_1', name: 'A', role: 'B', photoUrl: 'data:image/png;base64,...' }` (> 600,000 chars)
   - Reason for Rejection: `photoUrl.size() > 500000`.

6. **Payload 6 (Missing Required Fields)**:
   - Target: `/userProfiles/usr_1`
   - Content: `{ userId: 'usr_1' }` (Missing `name`, `role`)
   - Reason for Rejection: Missing required fields.

7. **Payload 7 (Path Variable Poisoning)**:
   - Target: `/userProfiles/../../etc/passwd` or long non-alphanumeric string
   - Content: `{ userId: 'bad_id', name: 'Hacker', role: 'Lead' }`
   - Reason for Rejection: Path does not match regex `^[a-zA-Z0-9_\-]+$`.

8. **Payload 8 (Field Observation Identity Hijack)**:
   - Target: `/fieldObservations/obs_1`
   - Content: `{ id: 'obs_1', userId: 'victim_uid', farmerName: 'Bob', village: 'V', crop: 'Paddy', date: '2026-09-25' }`
   - Reason for Rejection: `userId` does not match `request.auth.uid`.

9. **Payload 9 (Observation Mutation by Non-Owner)**:
   - Target: `/fieldObservations/obs_1` (created by `user_a`, update requested by `user_b`)
   - Reason for Rejection: `existing().userId != request.auth.uid`.

10. **Payload 10 (Type Poisoning on Observation)**:
    - Target: `/fieldObservations/obs_2`
    - Content: `{ id: 'obs_2', userId: 'usr_1', farmerName: 12345, village: true, crop: 'Paddy', date: '2026-09-25' }`
    - Reason for Rejection: `farmerName` and `village` must be strings.

11. **Payload 11 (Empty ID or Malformed ID on Observation)**:
    - Target: `/fieldObservations/` with empty string ID
    - Reason for Rejection: Invalid ID format.

12. **Payload 12 (Immutability Bypass)**:
    - Target: `/fieldObservations/obs_1`
    - Attempting to update `userId` or `createdAt` to different values during update.
    - Reason for Rejection: `incoming().userId == existing().userId` violated.
