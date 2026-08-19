// =====================================================
// PROJECTS
// =====================================================

const projectsContainer =
    document.getElementById("projects-container");


async function loadProjects() {

    try {

        const response =
            await fetch(
                "https://personal-portfolio-06gz.onrender.com/api/projects"
            );


        if (!response.ok) {

            throw new Error(
                "Failed to fetch projects"
            );

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


            card.classList.add(
                "project-card"
            );


            card.innerHTML = `

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

                <div class="project-links">

                    <a
                        href="${project.githubUrl}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>

                    <a
                        href="${project.liveUrl}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Live Demo
                    </a>

                </div>

            `;


            projectsContainer.appendChild(
                card
            );

        });


    } catch (error) {

        console.error(
            "Error loading projects:",
            error
        );


        projectsContainer.innerHTML =
            "<p>Unable to load projects.</p>";

    }

}


// Load projects when page loads
loadProjects();



// =====================================================
// CONTACT FORM
// =====================================================

const contactForm =
    document.getElementById("contact-form");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const message =
                document
                    .getElementById("message")
                    .value
                    .trim();


            try {

                const response =
                    await fetch(
                        "https://personal-portfolio-06gz.onrender.com/api/contact",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
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

                    alert(
                        "Message sent successfully! ✅"
                    );


                    contactForm.reset();


                } else {

                    alert(
                        "Failed to send message: " +
                        (
                            data.message ||
                            "Unknown error"
                        )
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

        }
    );

}