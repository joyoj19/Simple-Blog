
**Lavender Lion Blog**

Welcome to the webapp for Lavender Lions. A blog for people to express their love of their favourite animals. Pets, wild animals, fictional or fantasy, we want to hear about your animals.

**Compulsory Features**
1.    Users can create accounts.
Each new user can choose a unique username and password.The user also must enter their real name and date of birth with a brief description about themselves.
New users can do this on the New Account page by using the navbar "New Account" link or from the login screen link"create one here" link.

2.    A username must be unique
While typing a username when creating an account, if the username is already taken, a message is surfaced - "This username is already taken!" replaces the Username: label above the textbox.  If the form is completed and "Create account" attempted, the form is cleared and a message is surfaced above the form heading - "Account Exists!"

3. Users must enter password two times to create an account and these need to match in order to proceed - users are also given immediate feedback if passwords don't match. and the Create Account button is disabled if they do not match.

4. Users can select from a predetermined list of avatars - these will be displayed on all articles that the user publishes and any comments that a user may make on other articles.

5. Once a use account is created, the user can login and logout.

6. Passwords created from the webbapp are stored in the database after hashing and salting using the bcrypt package.

7. Users can browse a list of all articles from the home page displayed as cards grids. If logged in, they can see a list of all of their own articles via their profile page.  Users and visitors can also view all the articles for a particular author by selecting the author name on a card on the home page or in the full article view.

8. Once logged in users can create a New Article by clicking on the link in the navbar.  They can also edit or delete their own existing articles from their article list in their profile page.  When they create a new article they can upload an image file to be the main image associated with their article which then appears in the home page card grid.

9. TinyMCE was used as the WYSIWYG to create and edit articles. TinyMCE will also support users embedding content in their articles.

10. Users can edit any of the account information as well as delete their account from their profile page.
- Selecting Edit will surface a modal containing all the user info in editable fields.  The user must either change their password or enter and re-enter their existing password to update their account.
- Selecting Delete will surface a confirmation modal, prompting the user to confirm they want to delete the account and advising all their articles and comments will be deleted.

11. The website is responsive as screen size is reduced:
- Menu bar will stack
- Home and User page grids reducing from 3 to 2 to 1
- Article, Edit Article and New Article pages reduce the width of the card and card content
- Edit profile model fields / TinyMCE width reduced with screen size, as is the column layout of the avatars to choose from
- Search and Admin tables condense content and a horizontal scroll bar will surface when screen is reduced further
- New Account form width reduces with screen size and is responsive down to 300px

**Extra Features**
1. Admin page.
For a user with administration rights. The link on the navbar appears for the admin page.  This page has 2 tables.
Table of user information where the administrator can delete any user.
Table of articles where the administrator can delete any article.

2. Comments on articles
In the full article view logged in users are able to leave a comment.  And can also reply to a previous comment. Admin user has the ability to delete any comment or reply from and article page.

3. Social Media Buttons
Social media share buttons appear on the full article page to share article.  Unfortunately without an actual url they cannot be fully functional, however if this is ever done the href for each can be changed and they will function as required.

4. Like button, like count, view count and comment count appear on the homepage for each article.
On each article page there is a like button with a count for the number of likes and the number of views.

5. Search Function
Located in top navbar, this returns a list of articles containing the search content.

**Instructions on what the database file (*.db file) should be named**
    Save the new database into  cs-719-final-project-s2-2021-lavender-lion folder and name the file project-database
    open project-database-init-script.sql and run and write changes to the project-database.db

**Instructions to run web-app**
    npm install
    npm install --save sqlite
    npm install --save sql-template-strings

**login details**

Admin user:
testUser99:  Password1!

Regular Users:
Yogi-bear:  Password2!
Pikachu:  Password3!
MistyMoo101:  Password4!
champ99:  Password5!

Note that user champ99 has not articles of their own

**other instructions / comments**
Additions we would have made if we had more time:
set a min-max image size for the image upload to ensure a suitable image was chosen to display
figure out how to code a hamburger fully collapsible navbar without bootstrap
