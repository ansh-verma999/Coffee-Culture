document.addEventListener('DOMContentLoaded', function() {
    // User state management
    let currentUser = null;
    
    // Modal elements
    const websiteOverlay = document.querySelector('.website-overlay');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const loginLink = document.getElementById('loginLink');
    const signupLink = document.getElementById('signupLink');
    const showLogin = document.getElementById('showLogin');
    const showSignup = document.getElementById('showSignup');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const welcomeLogin = document.getElementById('welcomeLogin');
    const welcomeSignup = document.getElementById('welcomeSignup');
    const continueGuest = document.getElementById('continueGuest');
    const userGreeting = document.querySelector('.user-greeting');
    const usernameSpan = document.getElementById('username');

    // Modal functions
    function openModal(modal) {
        if (!modal) return;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Show website content
    function showWebsiteContent() {
        websiteOverlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    // Update UI based on login state
    function updateUserState() {
        if (currentUser) {
            document.querySelectorAll('#loginLink, #signupLink').forEach(el => el.style.display = 'none');
            userGreeting.classList.remove('hidden');
            usernameSpan.textContent = currentUser.name || currentUser.email.split('@')[0];
        } else {
            document.querySelectorAll('#loginLink, #signupLink').forEach(el => el.style.display = 'block');
            userGreeting.classList.add('hidden');
        }
    }

    // Welcome modal buttons
    if (welcomeLogin) {
        welcomeLogin.addEventListener('click', () => {
            openModal(loginModal);
        });
    }

    if (welcomeSignup) {
        welcomeSignup.addEventListener('click', () => {
            openModal(signupModal);
        });
    }

    if (continueGuest) {
        continueGuest.addEventListener('click', () => {
            showWebsiteContent();
        });
    }

    // Navbar login/signup links
    if (loginLink) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(loginModal);
        });
    }

    if (signupLink) {
        signupLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(signupModal);
        });
    }

    // Switch between login/signup
    if (showLogin) {
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(signupModal);
            openModal(loginModal);
        });
    }

    if (showSignup) {
        showSignup.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(loginModal);
            openModal(signupModal);
        });
    }

    // Close modals
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // Login form
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // In a real app, you would validate with server
            if (email && password) {
                currentUser = {
                    email: email,
                    name: email.split('@')[0]
                };
                updateUserState();
                closeModal(loginModal);
                showWebsiteContent();
                loginForm.reset();
                alert(`Welcome back, ${currentUser.name}!`);
            } else {
                alert('Please enter both email and password');
            }
        });
    }

    // Signup form
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('signupConfirmPassword').value;
            
            if (!name || !email || !password || !confirmPassword) {
                alert('Please fill in all fields');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            if (password.length < 6) {
                alert('Password must be at least 6 characters');
                return;
            }
            
            currentUser = { name, email };
            updateUserState();
            closeModal(signupModal);
            showWebsiteContent();
            signupForm.reset();
            alert(`Welcome to Brew Haven, ${name}!`);
        });
    }

    // Logout
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            currentUser = null;
            updateUserState();
            websiteOverlay.classList.remove('hidden');
        });
    }

    // Initialize user state
    updateUserState();

    // Mobile menu toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navList.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Menu tabs functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const menuItemsContainer = document.querySelector('.menu-items');
    
    // Menu data
    const menuData = {
        coffee: [
            {
                name: "Espresso",
                description: "Strong black coffee made by forcing steam through ground coffee beans.",
                price: "Rs 299.00",
                image: "Espresso.jpg",
            },
            {
                name: "Cappuccino",
                description: "Espresso with steamed milk and a silky layer of foam.",
                price: "Rs 385.00",
                image: "Cappuccino.jpg",
            },
            {
                name: " Iced Latte",
                description: "Espresso with a lot of steamed milk and a light layer of foam.",
                price: "Rs 405.00",
                image: "Icelatte.jpg"
            }
        ],
        tea: [
            {
                name: "Green Tea",
                description: "Light and refreshing tea with antioxidants.",
                price: "Rs 259.00",
                image: "GreenTea.jpg"
            },
            {
                name: "Chai Latte",
                description: "Spiced tea with steamed milk and honey.",
                price: "Rs 359.00",
                image: "ChaiLatte.jpg"
            }
        ],
        pastry: [
            {
                name: "Croissant",
                description: "Buttery, flaky pastry perfect with coffee.",
                price: "Rs 105.00",
                image: "Crossiant.jpg"
            },
            {
                name: "Blueberry Muffin",
                description: "Moist muffin packed with fresh blueberries.",
                price: "Rs 320.00",
                image: "BlueBerryMuffin.jpg"
            },
            {
                name: "Éclair Pastry",
                description: "A soft, cream-filled pastry topped with chocolate glaze — pure indulgence in every bite!.",
                price: "Rs 199.00",
                image: "EclairPastry.jpg"
            }
        ]
    };
    
    // Function to load menu items
    function loadMenuItems(category) {
        menuItemsContainer.innerHTML = '';
        
        menuData[category].forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="menu-item-content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p class="menu-item-price">${item.price}</p>
                </div>
            `;
            menuItemsContainer.appendChild(menuItem);
        });
    }
    
    // Set active tab and load items
    function setActiveTab(btn) {
        tabButtons.forEach(button => button.classList.remove('active'));
        btn.classList.add('active');
        loadMenuItems(btn.dataset.category);
    }
    
    // Add click event to tab buttons
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            setActiveTab(this);
        });
    });

    // Load initial menu (coffee)
    setActiveTab(document.querySelector('.tab-btn.active'));
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
});