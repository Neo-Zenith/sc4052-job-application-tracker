curl -X POST \
 'localhost:8080/api/v1/gemini/resume' \
 --header "Content-Type: multipart/form-data" \
 --header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEsInN1YiI6ImthaXNlb25nIiwiaWF0IjoxNzExNjExNjAzLCJleHAiOjE3MTI0NzU2MDN9.-M27zltAMg8sarFroM8fsjq9yEECYZUyntudz-02-xHdsSXnLUXeKrgu8EMfxeugfmmB8kyVR5hEPcoYBribCg' \
 --form 'applicationId="1"' \
 --form 'file=@c:\Users\kaise\OneDrive\Desktop\Codebase\NTU\SC4052\SC4052-applicant-tracker\server\resume.pdf'

curl -X POST \
 'localhost:8080/api/v1/gemini/cover-letter' \
 --header "Content-Type: multipart/form-data" \
 --header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEsInN1YiI6ImthaXNlb25nIiwiaWF0IjoxNzExNjExNjAzLCJleHAiOjE3MTI0NzU2MDN9.-M27zltAMg8sarFroM8fsjq9yEECYZUyntudz-02-xHdsSXnLUXeKrgu8EMfxeugfmmB8kyVR5hEPcoYBribCg' \
 --form 'applicationId="1"'

curl -X POST \
 'localhost:8080/api/v1/resumes' \
 --header "Content-Type: multipart/form-data" \
 --header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEsInN1YiI6ImthaXNlb25nIiwiaWF0IjoxNzExNjExNjAzLCJleHAiOjE3MTI0NzU2MDN9.-M27zltAMg8sarFroM8fsjq9yEECYZUyntudz-02-xHdsSXnLUXeKrgu8EMfxeugfmmB8kyVR5hEPcoYBribCg' \
 --form 'file=@c:\Users\kaise\OneDrive\Desktop\Codebase\NTU\SC4052\SC4052-applicant-tracker\server\resume.pdf'

curl -X POST \
 '172.171.242.107:8080/api/v1/resumes' \
 --header "Content-Type: multipart/form-data" \
 --header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEsInN1YiI6ImthaXNlb25nIiwiaWF0IjoxNzExNjExNjAzLCJleHAiOjE3MTI0NzU2MDN9.-M27zltAMg8sarFroM8fsjq9yEECYZUyntudz-02-xHdsSXnLUXeKrgu8EMfxeugfmmB8kyVR5hEPcoYBribCg' \
 --form 'file=@c:\Users\kaise\OneDrive\Desktop\Codebase\NTU\SC4052\SC4052-applicant-tracker\server\resume.pdf'

curl -X GET \
 '172.171.242.107:8080/api/v1/resumes/83677c1c-37a2-4840-9654-2ce0ccd7bd68' \
 --header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEsInN1YiI6ImthaXNlb25nIiwiaWF0IjoxNzExNjExNjAzLCJleHAiOjE3MTI0NzU2MDN9.-M27zltAMg8sarFroM8fsjq9yEECYZUyntudz-02-xHdsSXnLUXeKrgu8EMfxeugfmmB8kyVR5hEPcoYBribCg'
