// DOM Elements
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const browseBtn = document.getElementById('browse-btn');
const fileList = document.getElementById('file-list');
const toolOptions = document.getElementById('tool-options');
const resultSection = document.getElementById('result-section');
const spinner = document.getElementById('spinner');
const downloadBtn = document.getElementById('download-btn');
const historySection = document.getElementById('history-section');
const historyLink = document.getElementById('history-link');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const logoutBtn = document.getElementById('logout-btn');
const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');
const loginClose = document.getElementById('login-close');
const signupClose = document.getElementById('signup-close');
const showSignup = document.getElementById('show-signup');
const showLogin = document.getElementById('show-login');
const tryNowBtn = document.getElementById('try-now-btn');
const toolsGrid = document.getElementById('tools-grid');
const featuresGrid = document.getElementById('features-grid');
const footerContent = document.getElementById('footer-content');

// Current state
let currentTool = null;
let uploadedFiles = [];
let isLoggedIn = false;

// Tool data
const tools = [
    { id: 'pdf-to-word', icon: 'file-word', name: 'PDF to Word', desc: 'Convert PDF files to editable Word documents' },
    { id: 'word-to-pdf', icon: 'file-pdf', name: 'Word to PDF', desc: 'Convert Word documents to PDF files' },
    { id: 'pdf-to-excel', icon: 'file-excel', name: 'PDF to Excel', desc: 'Extract tables from PDF to Excel' },
    { id: 'excel-to-pdf', icon: 'file-pdf', name: 'Excel to PDF', desc: 'Convert Excel files to PDF documents' },
    { id: 'pdf-to-ppt', icon: 'file-powerpoint', name: 'PDF to PPT', desc: 'Convert PDF to PowerPoint' },
    { id: 'ppt-to-pdf', icon: 'file-pdf', name: 'PPT to PDF', desc: 'Convert PowerPoint to PDF' },
    { id: 'pdf-to-jpg', icon: 'file-image', name: 'PDF to JPG', desc: 'Convert PDF pages to images' },
    { id: 'jpg-to-pdf', icon: 'file-pdf', name: 'JPG to PDF', desc: 'Convert images to PDF' },
    { id: 'merge-pdf', icon: 'object-group', name: 'Merge PDF', desc: 'Combine multiple PDF files' },
    { id: 'split-pdf', icon: 'cut', name: 'Split PDF', desc: 'Split PDF into multiple files' },
    { id: 'compress-pdf', icon: 'compress-alt', name: 'Compress PDF', desc: 'Reduce PDF file size' },
    { id: 'watermark-pdf', icon: 'stamp', name: 'Watermark PDF', desc: 'Add watermark to PDF' },
    { id: 'page-numbers', icon: 'list-ol', name: 'Page Numbers', desc: 'Add page numbers to PDF' },
    { id: 'rotate-pdf', icon: 'redo', name: 'Rotate PDF', desc: 'Rotate PDF pages' },
    { id: 'protect-pdf', icon: 'lock', name: 'Protect PDF', desc: 'Add password protection' },
    { id: 'unlock-pdf', icon: 'unlock', name: 'Unlock PDF', desc: 'Remove password from PDF' }
];

// Feature data
const features = [
    { icon: 'lock', title: 'Secure Processing', desc: 'Files deleted after 2 hours' },
    { icon: 'mobile-alt', title: 'Mobile Friendly', desc: 'Works on all devices' },
    { icon: 'bolt', title: 'Fast Processing', desc: 'Quick document processing' },
    { icon: 'check-circle', title: 'High Quality', desc: 'Professional quality results' },
    { icon: 'infinity', title: 'No Limits', desc: 'No watermarks or restrictions' },
    { icon: 'user-shield', title: 'Privacy Focused', desc: 'No tracking or ads' }
];

// Footer data
const footerLinks = {
    "PDF Tools": [
        "PDF to Word", "PDF to Excel", "PDF to PPT", 
        "PDF to JPG", "Merge PDF", "Split PDF"
    ],
    "Document Tools": [
        "Word to PDF", "Excel to PDF", "PPT to PDF", 
        "JPG to PDF", "Compress PDF", "Protect PDF"
    ],
    "Company": [
        "About Us", "Contact", "Privacy Policy", 
        "Terms of Service", "FAQ", "Blog"
    ]
};

// Initialize the app
function init() {
    renderTools();
    renderFeatures();
    renderFooter();
    setupEventListeners();
}

// Render tools grid
function renderTools() {
    toolsGrid.innerHTML = tools.map(tool => `
        <div class="tool-card" data-tool="${tool.id}">
            <i class="fas fa-${tool.icon}"></i>
            <h3>${tool.name}</h3>
            <p>${tool.desc}</p>
        </div>
    `).join('');
}

// Render features grid
function renderFeatures() {
    featuresGrid.innerHTML = features.map(feature => `
        <div class="feature-card">
            <i class="fas fa-${feature.icon}"></i>
            <h3>${feature.title}</h3>
            <p>${feature.desc}</p>
        </div>
    `).join('');
}

// Render footer content
function renderFooter() {
    footerContent.innerHTML = `
        <div class="footer-column">
            <h3>DocTools</h3>
            <p>Your complete online solution for PDF and document management.</p>
            <div class="social-links">
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-linkedin-in"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
            </div>
        </div>
        ${Object.entries(footerLinks).map(([title, links]) => `
            <div class="footer-column">
                <h3>${title}</h3>
                <ul class="footer-links">
                    ${links.map(link => `<li><a href="#">${link}</a></li>`).join('')}
                </ul>
            </div>
        `).join('')}
    `;
}

// Setup event listeners
function setupEventListeners() {
    // File upload
    browseBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileSelect);
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    
    // Tool cards
    document.querySelectorAll('.tool-card').forEach(card => {
        card.addEventListener('click', () => {
            currentTool = card.getAttribute('data-tool');
            showToolOptions(currentTool);
            scrollToUploadArea();
        });
    });
    
    // Modals
    loginBtn.addEventListener('click', () => loginModal.classList.add('active'));
    signupBtn.addEventListener('click', () => signupModal.classList.add('active'));
    loginClose.addEventListener('click', () => loginModal.classList.remove('active'));
    signupClose.addEventListener('click', () => signupModal.classList.remove('active'));
    showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.remove('active');
        signupModal.classList.add('active');
    });
    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signupModal.classList.remove('active');
        loginModal.classList.add('active');
    });
    
    // Other buttons
    tryNowBtn.addEventListener('click', scrollToTools);
    historyLink.addEventListener('click', toggleHistory);
    logoutBtn.addEventListener('click', handleLogout);
    
    // Form submissions
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('signup-form').addEventListener('submit', handleSignup);
}

// File handling functions
function handleFileSelect(e) {
    const files = e.target.files;
    addFilesToUploadList(files);
}

function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    uploadArea.classList.add('active');
}

function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    uploadArea.classList.remove('active');
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    uploadArea.classList.remove('active');
    const files = e.dataTransfer.files;
    addFilesToUploadList(files);
}

function addFilesToUploadList(files) {
    if (files.length === 0) return;
    
    fileList.innerHTML = '';
    uploadedFiles = Array.from(files);
    
    uploadedFiles.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        
        const fileInfo = document.createElement('div');
        fileInfo.className = 'file-item-info';
        
        let fileIcon;
        if (file.type.includes('pdf')) {
            fileIcon = '<i class="fas fa-file-pdf"></i>';
        } else if (file.type.includes('word') || file.type.includes('document')) {
            fileIcon = '<i class="fas fa-file-word"></i>';
        } else if (file.type.includes('excel') || file.type.includes('spreadsheet')) {
            fileIcon = '<i class="fas fa-file-excel"></i>';
        } else if (file.type.includes('powerpoint') || file.type.includes('presentation')) {
            fileIcon = '<i class="fas fa-file-powerpoint"></i>';
        } else if (file.type.includes('image')) {
            fileIcon = '<i class="fas fa-file-image"></i>';
        } else {
            fileIcon = '<i class="fas fa-file"></i>';
        }
        
        fileInfo.innerHTML = `
            ${fileIcon}
            <div>
                <div class="file-item-name">${file.name}</div>
                <div class="file-item-size">${formatFileSize(file.size)}</div>
            </div>
        `;
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'file-item-remove';
        removeBtn.innerHTML = '<i class="fas fa-times"></i>';
        removeBtn.addEventListener('click', () => {
            uploadedFiles.splice(index, 1);
            fileItem.remove();
            if (uploadedFiles.length === 0) fileList.innerHTML = '';
        });
        
        fileItem.appendChild(fileInfo);
        fileItem.appendChild(removeBtn);
        fileList.appendChild(fileItem);
    });
    
    if (currentTool) showToolOptions(currentTool);
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Tool options functions
function showToolOptions(tool) {
    if (uploadedFiles.length === 0) {
        toolOptions.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <i class="fas fa-exclamation-circle" style="font-size: 2rem; color: var(--warning-color); margin-bottom: 15px;"></i>
                <h3>No files uploaded</h3>
                <p>Please upload files to use this tool.</p>
            </div>
        `;
        toolOptions.classList.add('active');
        return;
    }
    
    let optionsHTML = '';
    let actionButtonText = 'Process';
    
    switch(tool) {
        case 'pdf-to-word':
            optionsHTML = `
                <h2>PDF to Word Conversion</h2>
                <p>Convert your PDF file to an editable Word document.</p>
                
                <div class="option-group">
                    <h3>Output Format</h3>
                    <div class="radio-group">
                        <label class="radio-option">
                            <input type="radio" name="word-format" value="docx" checked>
                            DOCX (Microsoft Word)
                        </label>
                        <label class="radio-option">
                            <input type="radio" name="word-format" value="doc">
                            DOC (Legacy Word Format)
                        </label>
                        <label class="radio-option">
                            <input type="radio" name="word-format" value="odt">
                            ODT (OpenDocument Text)
                        </label>
                    </div>
                </div>
                
                <div class="option-group">
                    <h3>Conversion Options</h3>
                    <label class="checkbox-option">
                        <input type="checkbox" name="preserve-layout" checked>
                        Preserve original layout
                    </label>
                    <label class="checkbox-option">
                        <input type="checkbox" name="ocr" checked>
                        Use OCR for scanned documents
                    </label>
                </div>
            `;
            break;
            
        case 'merge-pdf':
            optionsHTML = `
                <h2>Merge PDF Files</h2>
                <p>Combine multiple PDF files into a single document.</p>
                
                <div class="option-group">
                    <h3>Merge Order</h3>
                    <p>Drag and drop files to reorder them:</p>
                    <div id="merge-order-list" style="border: 1px solid #eee; border-radius: var(--border-radius); padding: 10px;">
                        ${uploadedFiles.map((file, index) => `
                            <div class="file-item" data-index="${index}" style="margin-bottom: 5px; cursor: move;">
                                <div class="file-item-info">
                                    <i class="fas fa-file-pdf"></i>
                                    <div>
                                        <div class="file-item-name">${file.name}</div>
                                        <div class="file-item-size">${formatFileSize(file.size)}</div>
                                    </div>
                                </div>
                                <i class="fas fa-grip-lines" style="color: #999;"></i>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            actionButtonText = 'Merge PDFs';
            break;
            
        case 'compress-pdf':
            optionsHTML = `
                <h2>Compress PDF</h2>
                <p>Reduce the file size of your PDF document.</p>
                
                <div class="option-group">
                    <h3>Compression Level</h3>
                    <div class="radio-group">
                        <label class="radio-option">
                            <input type="radio" name="compression-level" value="low" checked>
                            Low Compression (Best Quality)
                        </label>
                        <label class="radio-option">
                            <input type="radio" name="compression-level" value="medium">
                            Medium Compression (Recommended)
                        </label>
                        <label class="radio-option">
                            <input type="radio" name="compression-level" value="high">
                            High Compression (Smallest Size)
                        </label>
                    </div>
                </div>
            `;
            actionButtonText = 'Compress PDF';
            break;
            
        case 'protect-pdf':
            optionsHTML = `
                <h2>Protect PDF</h2>
                <p>Add password protection to your PDF file.</p>
                
                <div class="option-group">
                    <h3>Password Protection</h3>
                    <div class="form-group">
                        <label for="protect-password">Password</label>
                        <input type="password" id="protect-password" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="protect-confirm">Confirm Password</label>
                        <input type="password" id="protect-confirm" class="form-control" required>
                    </div>
                </div>
                
                <div class="option-group">
                    <h3>Permissions</h3>
                    <label class="checkbox-option">
                        <input type="checkbox" name="allow-printing" checked>
                        Allow printing
                    </label>
                    <label class="checkbox-option">
                        <input type="checkbox" name="allow-copying" checked>
                        Allow copying text
                    </label>
                    <label class="checkbox-option">
                        <input type="checkbox" name="allow-modifications">
                        Allow modifications
                    </label>
                </div>
            `;
            actionButtonText = 'Protect PDF';
            break;
            
        case 'unlock-pdf':
            optionsHTML = `
                <h2>Unlock PDF</h2>
                <p>Remove password protection from your PDF file.</p>
                
                <div class="option-group">
                    <h3>PDF Password</h3>
                    <div class="form-group">
                        <label for="unlock-password">Enter PDF password</label>
                        <input type="password" id="unlock-password" class="form-control" required>
                    </div>
                </div>
            `;
            actionButtonText = 'Unlock PDF';
            break;
            
        default:
            optionsHTML = `
                <div style="text-align: center; padding: 20px;">
                    <i class="fas fa-tools" style="font-size: 2rem; color: var(--primary-color); margin-bottom: 15px;"></i>
                    <h3>Tool Options</h3>
                    <p>Customize how you want to process your files.</p>
                </div>
            `;
    }
    
    toolOptions.innerHTML = `
        ${optionsHTML}
        <div class="action-buttons">
            <button class="btn btn-outline btn-large" id="cancel-btn">Cancel</button>
            <button class="btn btn-primary btn-large" id="process-btn">${actionButtonText}</button>
        </div>
    `;
    
    toolOptions.classList.add('active');
    
    document.getElementById('cancel-btn').addEventListener('click', () => {
        toolOptions.classList.remove('active');
        currentTool = null;
    });
    
    document.getElementById('process-btn').addEventListener('click', processFiles);
}

function processFiles() {
    if (uploadedFiles.length === 0) {
        alert('Please upload files first.');
        return;
    }
    
    // Check for password protection specific cases
    if (currentTool === 'protect-pdf') {
        const password = document.getElementById('protect-password').value;
        const confirm = document.getElementById('protect-confirm').value;
        
        if (!password || !confirm) {
            alert('Please enter and confirm the password.');
            return;
        }
        
        if (password !== confirm) {
            alert('Passwords do not match.');
            return;
        }
        
        if (password.length < 6) {
            alert('Password must be at least 6 characters.');
            return;
        }
    }
    
    if (currentTool === 'unlock-pdf') {
        const password = document.getElementById('unlock-password').value;
        if (!password) {
            alert('Please enter the PDF password.');
            return;
        }
    }
    
    spinner.classList.add('active');
    toolOptions.classList.remove('active');
    
    setTimeout(() => {
        spinner.classList.remove('active');
        showResult();
    }, 2000);
}

function showResult() {
    resultSection.innerHTML = `
        <div class="result-info">
            <div class="result-stats">
                <h3>Your file is ready!</h3>
                <p>Processed successfully in 2.5 seconds</p>
            </div>
            <button class="btn btn-primary download-btn" id="download-btn">
                <i class="fas fa-download"></i> Download
            </button>
        </div>
        <div class="preview-container">
            <div class="preview-placeholder">
                <i class="fas fa-file-pdf"></i>
                <p>File preview will appear here</p>
            </div>
        </div>
    `;
    
    resultSection.classList.add('active');
    document.getElementById('download-btn').addEventListener('click', handleDownload);
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

function handleDownload() {
    alert('Downloading your file...');
    if (isLoggedIn) addToHistory();
}

function addToHistory() {
    const file = uploadedFiles[0];
    const now = new Date();
    const dateStr = now.toLocaleDateString() + ' at ' + now.toLocaleTimeString();
    
    const tool = tools.find(t => t.id === currentTool) || { name: 'Document Processing', icon: 'file-pdf' };
    
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.innerHTML = `
        <div class="history-info">
            <i class="fas fa-${tool.icon} history-icon"></i>
            <div class="history-details">
                <h4>${file.name} - ${tool.name}</h4>
                <p>Processed on ${dateStr}</p>
            </div>
        </div>
        <div class="history-actions">
            <button class="history-btn history-download" title="Download">
                <i class="fas fa-download"></i>
            </button>
            <button class="history-btn history-delete" title="Delete">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    document.getElementById('history-list').insertBefore(historyItem, document.getElementById('history-list').firstChild);
    
    historyItem.querySelector('.history-download').addEventListener('click', () => {
        alert('Downloading file again...');
    });
    
    historyItem.querySelector('.history-delete').addEventListener('click', function() {
        if (confirm('Are you sure you want to delete this history item?')) {
            historyItem.remove();
        }
    });
}

function toggleHistory(e) {
    e.preventDefault();
    
    if (!isLoggedIn) {
        loginModal.classList.add('active');
        return;
    }
    
    if (!historySection.innerHTML) {
        historySection.innerHTML = `
            <h2>Your Document History</h2>
            <div class="history-list" id="history-list">
                <div class="history-item">
                    <div class="history-info">
                        <i class="fas fa-file-word history-icon"></i>
                        <div class="history-details">
                            <h4>Sample Document.pdf</h4>
                            <p>Processed on ${new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div class="history-actions">
                        <button class="history-btn history-download" title="Download">
                            <i class="fas fa-download"></i>
                        </button>
                        <button class="history-btn history-delete" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    historySection.classList.toggle('active');
    toolOptions.classList.remove('active');
    resultSection.classList.remove('active');
    
    if (historySection.classList.contains('active')) {
        historySection.scrollIntoView({ behavior: 'smooth' });
    }
}

// User authentication functions
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }
    
    isLoggedIn = true;
    loginModal.classList.remove('active');
    loginBtn.style.display = 'none';
    signupBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
    alert('Login successful!');
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;
    
    if (!name || !email || !password || !confirm) {
        alert('Please fill in all fields.');
        return;
    }
    
    if (password !== confirm) {
        alert('Passwords do not match.');
        return;
    }
    
    isLoggedIn = true;
    signupModal.classList.remove('active');
    loginBtn.style.display = 'none';
    signupBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
    alert('Account created successfully! You are now logged in.');
}

function handleLogout() {
    // Show confirmation prompt before logging out
    const confirmLogout = confirm('Are you sure you want to log out?');
    
    if (confirmLogout) {
        isLoggedIn = false;
        loginBtn.style.display = 'block';
        signupBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
        historySection.classList.remove('active');
        
        // Show logout success message
        alert('You have been successfully logged out.');
    }
}

// Utility functions
function scrollToUploadArea() {
    uploadArea.scrollIntoView({ behavior: 'smooth' });
}

function scrollToTools() {
    document.getElementById('tools').scrollIntoView({ behavior: 'smooth' });
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init);