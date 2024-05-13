document.addEventListener("DOMContentLoaded", async function() {
    try {
        const response = await fetch("/sidebar.html");
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const html = await response.text();
        const sidebar = document.createElement("div");
        sidebar.classList.add("sidebar");
        sidebar.innerHTML = html;
        document.body.insertBefore(sidebar, document.body.firstChild);
    } catch (error) {
        console.error("Error loading sidebar:", error);
    }
});
