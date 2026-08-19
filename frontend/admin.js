// =====================================================
// ADMIN LOGIN
// =====================================================

const loginForm =
    document.getElementById("login-form");

const loginStatus =
    document.getElementById("login-status");

const projectSection =
    document.getElementById("project-section");


// =====================================================
// LOGIN FORM
// =====================================================

loginForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        const username =
            document.getElementById("username").value.trim();

        const password =
            document.getElementById("password").value;

        loginStatus.textContent =
            "Logging in...";


        try {

            const response =
                await fetch(
                    "https://personal-portfolio-06gz.onrender.com/api/admin/login",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            username: username,
                            password: password
                        })
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                loginStatus.textContent =
                    data.message ||
                    "Login failed.";

                return;
            }


            localStorage.setItem(
                "adminToken",
                data.token
            );


            loginStatus.textContent =
                "Login successful!";


            projectSection.style.display =
                "block";


            loginForm.style.display =
                "none";


            // Load existing projects
            loadAdminProjects();


        } catch (error) {

            console.error(
                "Login error:",
                error
            );


            loginStatus.textContent =
                "Unable to connect to the server.";

        }

    }
);



// =====================================================
// ADD PROJECT
// =====================================================

const projectForm =
    document.getElementById("project-form");

const projectStatus =
    document.getElementById("project-status");


projectForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const token =
            localStorage.getItem("adminToken");


        if (!token) {

            projectStatus.textContent =
                "Please login first.";

            return;
        }


        const title =
            document.getElementById(
                "project-title"
            ).value.trim();


        const description =
            document.getElementById(
                "project-description"
            ).value.trim();


        const technologies =
            document.getElementById(
                "project-technologies"
            ).value
            .split(",")
            .map(tech => tech.trim())
            .filter(tech => tech !== "");


        const githubUrl =
            document.getElementById(
                "project-github"
            ).value.trim();


        const liveUrl =
            document.getElementById(
                "project-live"
            ).value.trim();


        projectStatus.textContent =
            "Adding project...";


        try {

            const response =
                await fetch(
                    "https://personal-portfolio-06gz.onrender.com/api/projects",
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                `Bearer ${token}`

                        },

                        body: JSON.stringify({

                            title:
                                title,

                            description:
                                description,

                            technologies:
                                technologies,

                            githubUrl:
                                githubUrl || "#",

                            liveUrl:
                                liveUrl || "#"

                        })

                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                projectStatus.textContent =
                    data.message ||
                    "Failed to add project.";

                return;
            }


            projectStatus.textContent =
                "Project added successfully! ✅";


            projectForm.reset();


            console.log(
                "Created project:",
                data.project
            );


            // Refresh project list
            loadAdminProjects();


        } catch (error) {

            console.error(
                "Add project error:",
                error
            );


            projectStatus.textContent =
                "Unable to connect to the server.";

        }

    }
);



// =====================================================
// LOAD ADMIN PROJECTS
// =====================================================

const adminProjectsContainer =
    document.getElementById(
        "admin-projects-container"
    );


async function loadAdminProjects() {

    try {

        const response =
            await fetch(
                "https://personal-portfolio-06gz.onrender.com/api/projects"
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load projects"
            );

        }


        const projects =
            await response.json();


        adminProjectsContainer.innerHTML =
            "";


        if (projects.length === 0) {

            adminProjectsContainer.innerHTML =
                "<p>No projects found.</p>";

            return;
        }


        projects.forEach(project => {

            const projectCard =
                document.createElement("div");


            projectCard.className =
                "project-card";


            projectCard.innerHTML = `

                <h3>
                    ${project.title}
                </h3>

                <p>
                    ${project.description}
                </p>

                <p>
                    <strong>
                        Technologies:
                    </strong>

                    ${project.technologies.join(", ")}
                </p>

                <button
                    class="delete-project"
                    data-id="${project._id}"
                >
                    Delete Project
                </button>

            `;


            adminProjectsContainer.appendChild(
                projectCard
            );

        });


        // =====================================================
        // DELETE BUTTON EVENTS
        // =====================================================

        document
            .querySelectorAll(".delete-project")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        deleteProject(
                            button.dataset.id
                        );

                    }
                );

            });


    } catch (error) {

        console.error(
            "Error loading admin projects:",
            error
        );


        adminProjectsContainer.innerHTML =
            "<p>Unable to load projects.</p>";

    }

}



// =====================================================
// DELETE PROJECT
// =====================================================

async function deleteProject(projectId) {

    const token =
        localStorage.getItem("adminToken");


    if (!token) {

        alert(
            "Please login again."
        );

        return;
    }


    const confirmed =
        confirm(
            "Are you sure you want to delete this project?"
        );


    if (!confirmed) {

        return;

    }


    try {

        const response =
            await fetch(
                `https://personal-portfolio-06gz.onrender.com/api/projects/${projectId}`,
                {

                    method: "DELETE",

                    headers: {

                        "Authorization":
                            `Bearer ${token}`

                    }

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert(
                data.message ||
                "Failed to delete project."
            );

            return;
        }


        alert(
            "Project deleted successfully!"
        );


        loadAdminProjects();


    } catch (error) {

        console.error(
            "Delete project error:",
            error
        );


        alert(
            "Unable to connect to the server."
        );

    }

}