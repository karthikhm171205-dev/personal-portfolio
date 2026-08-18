// ================= PROJECTS =================

const projectsContainer =
    document.getElementById("projects-container");


async function loadProjects() {

    try {

        const response =
            await fetch("http://localhost:5000/api/projects");

        if (!response.ok) {
            throw new Error("Failed to fetch projects");
        }

        const projects =
            await response.json();


        projectsContainer.innerHTML = "";


        if (projects.length === 0) {

            projectsContainer.innerHTML =
                "<p>No projects available.</p>";

            return;
        }


        projects.forEach(project => {

            const card =
                document.createElement("div");

            card.classList.add("project-card");


            card.innerHTML = `
                <h3>${project.title}</h3>

                <p>${project.description}</p>

                <p>
                    <strong>Technologies:</strong>
                    ${project.technologies.join(", ")}
                </p>

                <div class="project-links">

                    <a href="${project.githubUrl}"
                       target="_blank">
                        GitHub
                    </a>

                    <a href="${project.liveUrl}"
                       target="_blank">
                        Live Demo
                    </a>

                </div>
            `;


            projectsContainer.appendChild(card);

        });

    } catch (error) {

        console.error("Error loading projects:", error);

        projectsContainer.innerHTML =
            "<p>Unable to load projects.</p>";
    }
}


loadProjects();


// ================= CONTACT FORM =================

const contactForm =
    document.getElementById("contact-form");


contactForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("email").value;

    const message =
        document.getElementById("message").value;


    try {

        const response = await fetch(
            "http://localhost:5000/api/contact",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message
                })
            }
        );


        const data =
            await response.json();


        if (response.ok) {

            alert("Message sent successfully! ✅");

            contactForm.reset();

        } else {

            alert(
                "Failed to send message: " +
                (data.message || "Unknown error")
            );

        }

    } catch (error) {

        console.error(
            "Contact form error:",
            error
        );

        alert(
            "Unable to connect to the server."
        );

    }

});
// ================= ADD PROJECT FORM =================

const projectForm =
    document.getElementById("project-form");

const projectStatus =
    document.getElementById("project-status");


projectForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const title =
        document.getElementById("project-title").value.trim();

    const description =
        document.getElementById("project-description").value.trim();

    const technologies =
        document
            .getElementById("project-technologies")
            .value
            .split(",")
            .map(technology => technology.trim())
            .filter(technology => technology !== "");

    const githubUrl =
        document.getElementById("project-github").value.trim();

    const liveUrl =
        document.getElementById("project-live").value.trim();


    try {

        const response = await fetch(
            "http://localhost:5000/api/projects",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    title,
                    description,
                    technologies,
                    githubUrl: githubUrl || "#",
                    liveUrl: liveUrl || "#"
                })
            }
        );


        const data =
            await response.json();


        if (response.ok) {

            projectStatus.textContent =
                "Project added successfully! ✅";

            projectForm.reset();

            // Reload projects
            loadProjects();

        } else {

            projectStatus.textContent =
                data.message ||
                "Failed to add project.";

            console.error(data);

        }

    } catch (error) {

        console.error(
            "Project form error:",
            error
        );

        projectStatus.textContent =
            "Unable to connect to the server.";

    }

});