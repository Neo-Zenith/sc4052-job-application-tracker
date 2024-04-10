curl -X POST \
 'localhost:8080/api/v1/gemini/resume' \
 --header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEsInN1YiI6ImthaXNlb25nIiwiaWF0IjoxNzExNzc0OTEzLCJleHAiOjE3MTI2Mzg5MTN9.0EcNIWOye9v6IeJf0ML_qQhmvQkxvTCUU4LHSt6j1ehwa4JZcuDHR0UieMDeRHToUEyjwF-VvTjKj8HRHh8GdA' \
 --form 'applicationId="1"' \
 --form 'file =@c:\Users\kaise\OneDrive\Desktop\Codebase\NTU\SC4052\SC4052-applicant-tracker\server\resume.pdf'

curl -X POST \
 '172.171.242.107:8080/api/v1/gemini/resume' \
 --header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEsInN1YiI6ImthaXNlb25nIiwiaWF0IjoxNzExNzc0OTEzLCJleHAiOjE3MTI2Mzg5MTN9.0EcNIWOye9v6IeJf0ML_qQhmvQkxvTCUU4LHSt6j1ehwa4JZcuDHR0UieMDeRHToUEyjwF-VvTjKj8HRHh8GdA' \
 --form 'applicationId="1"' \
 --form 'file =@c:\Users\kaise\OneDrive\Desktop\Codebase\NTU\SC4052\SC4052-applicant-tracker\server\resume.pdf'

---

curl -X POST \
 'localhost:8080/api/v1/resumes' \
 --header 'Content-Type: multipart/form-data' \
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEsInN1YiI6ImthaXNlb25nIiwiaWF0IjoxNzExNzc0OTEzLCJleHAiOjE3MTI2Mzg5MTN9.0EcNIWOye9v6IeJf0ML_qQhmvQkxvTCUU4LHSt6j1ehwa4JZcuDHR0UieMDeRHToUEyjwF-VvTjKj8HRHh8GdA' \
 --form 'file =@c:\Users\kaise\OneDrive\Desktop\Codebase\NTU\SC4052\SC4052-applicant-tracker\server\resume.pdf'

curl -X POST \
 '172.171.242.107:8080/api/v1/resumes' \
 --header 'Content-Type: multipart/form-data' \
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEsInN1YiI6ImthaXNlb25nIiwiaWF0IjoxNzExNzc0OTEzLCJleHAiOjE3MTI2Mzg5MTN9.0EcNIWOye9v6IeJf0ML_qQhmvQkxvTCUU4LHSt6j1ehwa4JZcuDHR0UieMDeRHToUEyjwF-VvTjKj8HRHh8GdA' \
 --form 'file =@c:\Users\kaise\OneDrive\Desktop\Codebase\NTU\SC4052\SC4052-applicant-tracker\server\resume.pdf'

---
