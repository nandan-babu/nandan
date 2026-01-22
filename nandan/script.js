// Navigation
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling
document.querySelectorAll('.smooth-scroll, .nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-animated').forEach(el => {
    observer.observe(el);
});

// Project data
const projects = {
    'bk-groups': {
        title: 'BK Groups',
        image: 'portfolio/public/assets/img/work/item_1.jpg',
        subtitle: 'Web Design, Web Development, Infrastructure',
        description: 'Currently working on this project. A comprehensive web solution focusing on infrastructure and business management.'
    },
    'aura': {
        title: 'AURA',
        image: 'portfolio/public/assets/img/work/item_2.jpg',
        subtitle: 'Web Design, Web Development',
        description: `Developed a comprehensive e-commerce solution tailored for the beauty and personal care industry. The platform features a dual-interface system: a robust Admin Module for operational oversight and a seamless User Module for consumer engagement.

Integrated a dashboard to monitor real-time sales, customer demographics, and product performance statistics.

Managed end-to-end product lifecycles, including beauty product listings, dynamic pricing, and inventory tracking.

Streamlined order fulfillment processes and managed recurring subscription schedules and options.

Built tools to view and manage sensitive customer data and order histories.

Account Management: Implemented secure registration, login, and profile management systems.

Developed a wishlist feature for product curation and an "Order History" section for users to track their delivery status in real-time.`
    },
    'vila': {
        title: 'VILA Agency',
        image: 'portfolio/public/assets/img/work/item_4.jpg',
        subtitle: 'Web Design, Web Development',
        description: `Developed a full-stack real estate management system to streamline property listings, bookings, and builder approvals.

Built role-based modules for Admin, Builder, and User, each with dedicated dashboards and permissions.

Implemented core features including property addition, editing, deletion, and scheduling site visits.

Created an admin control panel to manage user registrations, approve builders, monitor bookings, and handle property data.

Enabled users to browse villas, book visits, and submit queries through an interactive front-end interface.

Built using Python (Django Framework) with MySQL as the database. The frontend is developed using HTML, CSS, JavaScript, and Bootstrap for responsive design, with REST API integration through Django REST Framework for data communication.`
    },
    'mediplus': {
        title: 'Mediplus',
        image: 'portfolio/public/assets/img/work/item_3.jpg',
        subtitle: 'Web Design, Web Development',
        description: `Developed a full-stack healthcare management platform with separate modules for admin, doctors, and users.

Built functionalities for users to view doctors, book and manage appointments, and raise health queries.

Designed an admin interface to add, edit, or remove doctors and manage all user appointments and feedback.

Streamlined appointment scheduling and communication, reducing manual workload and improving efficiency.

Enhanced user experience with real-time validation, message alerts, and a responsive interface.

Built using Django (Python) with SQLite3 as the database, and a responsive front end built using HTML, CSS, JavaScript, and Bootstrap.`
    }
};

// Project modal functionality
const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-modal');
const viewProjectButtons = document.querySelectorAll('.view-project');

viewProjectButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const workItem = button.closest('.work-item');
        const projectId = workItem.getAttribute('data-project');
        const project = projects[projectId];
        
        if (project) {
            modalBody.innerHTML = `
                <img src="${project.image}" alt="${project.title}" class="img-responsive">
                <h3>${project.title}</h3>
                <p class="subline">${project.subtitle}</p>
                <p>${project.description.split('\n').join('<br><br>')}</p>
            `;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Contact form
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Option 1: Using mailto (works without any service)
    const subject = encodeURIComponent(`Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    const mailtoLink = `mailto:nandan@example.com?subject=${subject}&body=${body}`;
    
    // Show success message
    formMessage.textContent = 'Opening your email client... If it doesn\'t open, please email me directly.';
    formMessage.className = 'form-message success';
    formMessage.style.display = 'block';
    
    // Open mailto link
    window.location.href = mailtoLink;
    
    // Reset form after a delay
    setTimeout(() => {
        contactForm.reset();
        formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
    }, 1000);
    
    // Hide message after 8 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 8000);
    
    /* 
    Option 2: Using Formspree (free service for static sites)
    Uncomment this and replace 'YOUR_FORMSPREE_ID' with your Formspree form ID
    Sign up at https://formspree.io/ to get a free form endpoint
    
    try {
        const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            contactForm.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        formMessage.textContent = 'Sorry, there was an error. Please try again or email me directly.';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
    }
    */
});

// Fix social links
document.querySelectorAll('.social-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('http')) {
        link.setAttribute('href', `https://${href}`);
    }
});

// Add active class to current nav link
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
