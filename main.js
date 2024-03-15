function storeAccessToken(token) {
  sessionStorage.setItem("access_token", token);
}

function loginWithGitHub() {
  // Define GitHub OAuth parameters
  var clientId = 'YOUR_CLIENT_ID'; // Replace with your GitHub OAuth App Client ID
  var redirectUri = 'http://localhost:8000/callback'; // Replace with your callback URL

  // Construct the OAuth URL
  var oauthUrl = 'https://github.com/login/oauth/authorize';
  oauthUrl += '?client_id=' + encodeURIComponent(clientId);
  oauthUrl += '&redirect_uri=' + encodeURIComponent(redirectUri);

  // Redirect user to GitHub OAuth login page
  window.location.href = oauthUrl;
}


function getAccessToken() {
  let token = sessionStorage.getItem(token);
  if (!token) {

  var clientId = 'YOUR_CLIENT_ID'; // Replace with your GitHub OAuth App Client ID
  var clientSecret = 'YOUR_CLIENT_SECRET'; // Replace with your GitHub OAuth App Client Secret
  var redirectUri = 'http://localhost:8000/callback'; // Replace with your callback URL

  // Construct the token exchange URL
  var tokenUrl = 'https://github.com/login/oauth/access_token';
  tokenUrl += '?client_id=' + encodeURIComponent(clientId);
  tokenUrl += '&client_secret=' + encodeURIComponent(clientSecret);
  tokenUrl += '&code=' + encodeURIComponent(code);
  tokenUrl += '&redirect_uri=' + encodeURIComponent(redirectUri);

  // Send POST request to exchange code for access token
  return fetch(tokenUrl, {
      method: 'POST',
      headers: {
          'Accept': 'application/json'
      }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Failed to obtain access token');
      }
      return response.json();
  })
  .then(data => {
      // Extract and return access token from response
      token = data.access_token;
  })
  .catch(error => {
      console.error('Error obtaining access token:', error);
      throw error; // Propagate the error
  });
  }
}

function onLoaded() {
  var apiUrl = "https://api.github.com/user";
  // Fetch user data from GitHub API
  const token = getAccessToken()
  fetch(apiUrl, {
      headers: {
          // Provide the user's access token obtained during OAuth authentication
          "Authorization": "token ${token}"
      }
  })
  .then(response => response.json())
  .then(data => {
      // Construct user profile HTML
      var profileHtml = `
          <img src="${data.avatar_url}" alt="User Avatar">
          <h2>${data.name || data.login}</h2>
          <p>${data.bio || ''}</p>
          <p>Location: ${data.location || 'Unknown'}</p>
          <p>Followers: ${data.followers}</p>
          <p>Following: ${data.following}</p>
          <!-- Add more user information as needed -->
      `;
      
      // Insert profile HTML into profile container
      document.getElementById("profile-container").innerHTML = profileHtml;
  })
  .catch(error => {
      console.error("Error fetching user data:", error);
      // Handle error
  });

  // Handle logout link click event
  document.getElementById("logout-link").addEventListener("click", function(event) {
      // Your logout logic here
      // Redirect user to logout endpoint or perform any necessary cleanup
      event.preventDefault(); // Prevent the default behavior of the link
  });
}
document.addEventListener("DOMContentLoaded", function() {
  
});

