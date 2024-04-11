FROM openjdk:17-jdk-alpine

# Make port 8080 available to the world outside this container
EXPOSE 8080

# The application's jar file
ARG JAR_FILE=target/application-tracker-server-0.0.1-SNAPSHOT.jar

# Add the application's jar to the container
ADD ${JAR_FILE} application-tracker-server-0.0.1-SNAPSHOT.jar

# Run the jar file 
ENTRYPOINT ["java","-jar","/application-tracker-server-0.0.1-SNAPSHOT.jar"]

