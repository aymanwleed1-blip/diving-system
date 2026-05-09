# Security Specification for RSEAS Dive Management

## 1. Data Invariants
- A Dive Log must have a status.
- Only Admin can grant roles (other than default viewer during signup).
- Supervisors cannot edit 'approved' Dive Logs.
- Audit logs are immutable (create only).
- All strings must have size limits.

## 2. The "Dirty Dozen" Payloads (Examples)
1. **Identity Spoofing**: Attempt to create a user with `role: 'admin'`. (Expect: DENIED)
2. **State Shortcutting**: Supervisor attempts to update a Dive Log with `status: 'approved'`. (Expect: DENIED)
3. **Resource Poisoning**: Large string (1MB) injected into `diverName`. (Expect: DENIED)
4. **Orphaned Write**: Create a Dive Log for a non-existent `projectId`. (Expect: DENIED - will need exists() check)
5. **PII Leak**: Non-auth user attempts to read `users` collection. (Expect: DENIED)
6. **Shadow Field**: Update Dive Log with `secretField: 'hacker'`. (Expect: DENIED via hashOnly)
7. **Bypassing Supervisor Lock**: Supervisor attempts to edit an approved log. (Expect: DENIED)
8. **Malicious ID**: Create a project with ID `../../../etc/passwd`. (Expect: DENIED via isValidId)
9. **Timestamp Spoofing**: Setting `createdAt` to a future date. (Expect: DENIED via request.time)
10. **Unauthorized Approval**: Supervisor attempts to set `isApproved: true`. (Expect: DENIED)
11. **Bulk Scrape**: Anonymous user attempts to list all projects. (Expect: DENIED)
12. **Audit Tampering**: Attempt to delete an audit log. (Expect: DENIED)

## 3. Test Runner
(I'll implement the rules first then verify logic)
