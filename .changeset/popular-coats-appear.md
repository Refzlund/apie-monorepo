---
"@apie/pipe": major
---

breaking: pipe will now throw errors, instead of catching them and returning `InternalServerError` - as that should be handled by the Backend framework
