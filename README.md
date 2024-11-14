# ByteBuy

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.2.

## Instructions for Setting Up the Project
### Prerequisites
- MySQL installed and configured.
- Access to the MySQL server with a user that has permissions to create and manage databases.
- A Java environment (JDK) installed to run the API.


### 1. Create the MySQL Database
- Open MySQL client.
- Create a new database using the following command:

   ```sql
   CREATE DATABASE your_database_name;
   ```
   -**Note**: Replace `your_mysql_user`.

### 2. Download and Extract the API Archive

Download the compressed API file from the provided link or specified location.

[Download api](https://mega.nz/file/oYszkaiD#EAbRhGDfe5OI1qX9Kjr88GNop66SBpoeQEQsvty8XF0)
   
Extract the file to a directory of your choice.

### 3. Import the `data.sql` File

   Open again MySQL client

   Import the `data.sql` file located in the extracted folder:
   
   - For example, using the MySQL command line:
     ```sql
     mysql -u your_mysql_user -p your_database_name < path/to/data.sql
     ```
   
   - **Note**: Make sure to replace `your_mysql_user` and `your_database_name` with your actual MySQL username and database name.
   
### 4. Edit the `application.properties` File

- Navigate to the `api/config/dwf-api/` folder.
- Open the `application.properties` file with a text editor.
- Update the following fields with your MySQL information:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
   spring.datasource.username=your_mysql_user
   spring.datasource.password=your_mysql_password
   ```
   
- ***Note**: Replace your_database_name, your_mysql_user, and your_mysql_password with the correct values for your setup.