let page = 1; // Number of requests
let limit = 15; // Posts per request
let isLoading = false; // Loading flag

const container = document.getElementById("main-container");

function fetchHomeData() {
    if (isLoading) return; // If data is already loading, do nothing
    isLoading = true; 

    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`)  //Instead of doing a limit in the for loop, we do it here
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error with the status: " + response.status);
            }
            return response.json();
        })
        .then((posts) => {
            
            let i = 1;
            for (let post of posts) {
                const article = document.createElement("article");
                const title = document.createElement("h1");
                title.textContent = post.title;

                const body = document.createElement("p");
                body.textContent = post.body;

                article.appendChild(title);
                article.appendChild(body);
                container.appendChild(article);

                // Add clearfix after every third post
                if (i % 3 === 0) {
                    const clearfix = document.createElement("div");
                    clearfix.setAttribute("class", "clearfix");
                    container.appendChild(clearfix);
                }
                i++;
            }

            
            page++;
            isLoading = false; 
        })
        .catch((error) => {
            console.error("Error fetching posts:", error);
            isLoading = false; // Reset the flag in case of an error
        });
}

// Scroll event listener to load more posts when reaching the bottom
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        fetchHomeData(); // Load more posts when reaching the bottom
    }
});

// Load initial set of posts when the page loads
window.addEventListener("DOMContentLoaded", fetchHomeData);
