
## App 4 - A secure session

Encrypt and decrypt the session cookie with `cryptr` or another ecryption tool of your choice. If you want the encrypted cookies to be usable after you terminate and restart the application, choose a method that you consider secure enough for using a persistently stored encryption key, and document in the `README.md` file whatever the person installing the application needs to do to choose and persistently store a key.

### Resources

- [Environment Variables Considered Harmful for Your Secrets](http://movingfast.io/articles/environment-variables-considered-harmful/)

### Specs

- Your code is all in `/app4`
- Your dependencies are all listed in `/app4/package.json`
- You can start your server with `npm start`
- Your server should use `node` and `express`
- When I type my first name, last name and favorite color into the text fields and press "That's me!", the page reloads and displays the text "Welcome back [first_name] [last_name] I bet your favorite color is [favorite_color]!".
  - Example: If I enter "Ada", "Lovelace", "Green" and hit "Save my name!" The only thing I should see on the page is "Welcome back Ada Lovelace I bet your favorite color is green".
- If I reload the page I should still see the same text
- When I delete my cookies or visit the site in an incognito window, I should see the form again.
- All cookie related code should be in the express middleware
- The `homepage` and `form post` routes should read and write data only to and from `request.session` and not to the cookies header directly.
- The data in the cookie should be encrypted and decrypted on every request.