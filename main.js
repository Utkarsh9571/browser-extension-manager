let data = [
    {
        "logo": "./assets/images/logo-devlens.svg",
        "name": "DevLens",
        "description": "Quickly inspect page layouts and visualize element boundaries.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-style-spy.svg",
        "name": "StyleSpy",
        "description": "Instantly analyze and copy CSS from any webpage element.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-speed-boost.svg",
        "name": "SpeedBoost",
        "description": "Optimizes browser resource usage to accelerate page loading.",
        "isActive": false
    },
    {
        "logo": "./assets/images/logo-json-wizard.svg",
        "name": "JSONWizard",
        "description": "Formats, validates, and prettifies JSON responses in-browser.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-tab-master-pro.svg",
        "name": "TabMaster Pro",
        "description": "Organizes browser tabs into groups and sessions.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-viewport-buddy.svg",
        "name": "ViewportBuddy",
        "description": "Simulates various screen resolutions directly within the browser.",
        "isActive": false
    },
    {
        "logo": "./assets/images/logo-markup-notes.svg",
        "name": "Markup Notes",
        "description": "Enables annotation and notes directly onto webpages for collaborative debugging.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-grid-guides.svg",
        "name": "GridGuides",
        "description": "Overlay customizable grids and alignment guides on any webpage.",
        "isActive": false
    },
    {
        "logo": "./assets/images/logo-palette-picker.svg",
        "name": "Palette Picker",
        "description": "Instantly extracts color palettes from any webpage.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-link-checker.svg",
        "name": "LinkChecker",
        "description": "Scans and highlights broken links on any page.",
        "isActive": false
    },
    {
        "logo": "./assets/images/logo-dom-snapshot.svg",
        "name": "DOM Snapshot",
        "description": "Capture and export DOM structures quickly.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-console-plus.svg",
        "name": "ConsolePlus",
        "description": "Enhanced developer console with advanced filtering and logging.",
        "isActive": false
    }
];

const toggleTheme = document.querySelector('.theme-toggle');
const body = document.body;
const container = document.querySelector('.container');
const extensionHeader = document.querySelector('.extension-header');
const activityToggle = document.querySelector('.activity-toggle');
const toggleOptions = document.querySelectorAll('.toggle-options');
const extensionGrid = document.querySelector('.extension-grid');

const clearExtensions = () => {
    if (extensionGrid) {
        extensionGrid.innerHTML = '';
    }
};

const slideToggleButton = (button, isActive) => {
    const whiteBall = button.querySelector('.white-ball');
    if (isActive) {
        whiteBall.style.transform = 'translateX(1.2em)';
        button.style.backgroundColor = 'hsl(3, 86%, 64%)';
    } else {
        whiteBall.style.transform = 'translateX(0px)';
        button.style.backgroundColor = body.classList.contains('dark') ? 'hsl(226, 11%, 37%)' : 'hsl(0, 0%, 78%)';
    }
};

const renderCards = (filter) => {
    clearExtensions();

    const filteredData = filter === 'all' ? data : data.filter(extension => extension.isActive === (filter === 'active'));

    filteredData.forEach(extension => {
        const section = document.createElement('section');
        section.classList.add('extension-list', body.classList.contains('dark') ? 'dark' : 'light');
        section.innerHTML = `
            <header>
                <img src="${extension.logo}" alt="">
                <div class="info ${body.classList.contains('dark') ? 'dark' : 'light'}">
                    <h1 class="name">${extension.name}</h1>
                    <p class="description ${body.classList.contains('dark') ? 'dark' : 'light'}">${extension.description}</p>
                </div>
            </header>
            <div class="extension-buttons ${body.classList.contains('dark') ? 'dark' : 'light'}">
                <div class="remove ${body.classList.contains('dark') ? 'dark' : 'light'}">Remove</div>
                <div class="toggle-button" data-extension-name="${extension.name}">
                    <div class="white-ball"></div>
                </div>
            </div>
        `;
        extensionGrid.appendChild(section);
    });

    // Set up toggle button behavior after cards are rendered
    setupToggleButtons();
};

const setupToggleButtons = () => {
    const allToggleButtons = document.querySelectorAll('.toggle-button');
    allToggleButtons.forEach(button => {
        const extensionName = button.dataset.extensionName;
        const extension = data.find(ext => ext.name === extensionName);
        const isActive = extension ? extension.isActive : false;
        slideToggleButton(button, isActive);

        button.addEventListener('click', () => {
          const clickedExtension = data.find(ext => ext.name === extensionName);
          if (clickedExtension) {
              clickedExtension.isActive = !clickedExtension.isActive;
              slideToggleButton(button, clickedExtension.isActive);
              renderCards(document.querySelector('.toggle-options.active-light').id);
          }
        });
    });
};

const toggleClasses = (elements, class1, class2) => {
    elements.forEach(elm => {
        elm.classList.toggle(class1);
        elm.classList.toggle(class2);
    });
};

const themeChangeDark = () => {
    toggleClasses([body, container, extensionHeader, activityToggle], "light", "dark");
    toggleClasses(toggleOptions, "light", "dark");
    toggleClasses(document.querySelectorAll('.extension-list'), "light", "dark");
    toggleClasses(document.querySelectorAll('.info'), "light", "dark");
    toggleClasses(document.querySelectorAll('.remove'), "light", "dark");

    const logoLight = document.getElementById('logo-light');
    const logoDark = document.getElementById('logo-dark');

    logoDark.style.display = logoDark.style.display === 'none' ? 'block' : 'none';
    logoLight.style.display = logoLight.style.display === 'block' ? 'none' : 'block';
};

const changeIcon = () => {
    const sun = document.getElementById('icon-sun');
    const moon = document.getElementById('icon-moon');

    sun.style.display = sun.style.display === 'none' ? 'block' : 'none';
    moon.style.display = moon.style.display === 'block' ? 'none' : 'block';
};

const activateClickedOption = (option) => {
    toggleOptions.forEach(b => b.classList.remove('active-light'));
    option.classList.add('active-light');
};

toggleTheme.addEventListener('click', () => {
    changeIcon();
    themeChangeDark();
    renderCards(document.querySelector('.toggle-options.active-light').id);
});

toggleOptions.forEach(button => {
    button.addEventListener('click', () => {
        const clickedOption = button.id;
        activateClickedOption(button);
        renderCards(clickedOption);
    });
});

renderCards('all');
toggleOptions[0].click();


/*Changes and Explanations:

Data Modification: The data array now includes an isActive property for each extension. This is crucial for filtering.
Filtering in renderCards:
The renderCards function now takes a filter argument.
It filters the data array based on the filter value:
'all': No filtering, show all extensions.
'active': Show only extensions where isActive is true.
'inactive': Show only extensions where isActive is false.
Toggle State Management:
The slideToggleButton function now accepts an isActive parameter to set the initial state of the toggle.
Event listeners on the toggle buttons now correctly update the isActive property in the data array and call slideToggleButton to reflect the change.
The setupToggleButtons function now correctly sets the initial state of the toggle buttons based on the isActive property in the data.
Data Attribute: Added data-extension-name="${extension.name}" to the toggle button so we can identify which extension's state to toggle.
Corrected Theme Toggle: Ensured the toggle button colors are updated correctly when the theme changes.
Initial Click: The toggleOptions[0].click() line was added to simulate a click on the "All" button on page load, ensuring the extensions are rendered immediately.*/