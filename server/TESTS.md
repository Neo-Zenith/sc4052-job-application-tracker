curl -X POST \
 'localhost:8080/api/v1/gemini/resume' \
 --header "Content-Type: multipart/form-data" \
 --header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjMsInN1YiI6ImthaXNlb25nIiwiaWF0IjoxNzExMTE0MDQzLCJleHAiOjE3MTE5NzgwNDN9.iAbfq7lCoSzoDSPagK1x8eASfLC-aDixYVCtcW-6arAcgyqqB7SNkmf0qtUxGvQ3YHzG1fOPpqNRPDPNi0dUkA' \
 --form 'applicationId="1"' \
 --form 'file=@c:\Users\kaise\OneDrive\Desktop\Codebase\NTU\SC4052\SC4052-applicant-tracker\server\resume.pdf'

curl -X POST \
 'localhost:8080/api/v1/gemini/cover-letter' \
 --header "Content-Type: multipart/form-data" \
 --header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjMsInN1YiI6ImthaXNlb25nIiwiaWF0IjoxNzExMTE0MDQzLCJleHAiOjE3MTE5NzgwNDN9.iAbfq7lCoSzoDSPagK1x8eASfLC-aDixYVCtcW-6arAcgyqqB7SNkmf0qtUxGvQ3YHzG1fOPpqNRPDPNi0dUkA' \
 --form 'applicationId="1"'
