// Screen management
function showScreen(screenName) {
    // Hide all screens
    document.getElementById('dashboard-screen').style.display = 'none';
    document.getElementById('editor-screen').style.display = 'none';
    document.getElementById('settings-screen').style.display = 'none';
    
    // Show selected screen
    document.getElementById(screenName + '-screen').style.display = 'block';
    
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    // Update screen title
    const titles = {
        'dashboard': 'Dashboard',
        'editor': 'App Builder',
        'settings': 'Settings'
    };
    document.getElementById('screen-title').textContent = titles[screenName];
}

// Authentication
function login() {
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('app-container').style.display = 'flex';
}

function logout() {
    document.getElementById('auth-screen').style.display = 'flex';
    document.getElementById('app-container').style.display = 'none';
}

function toggleAuthForm() {
    const title = document.querySelector('.auth-title');
    const subtitle = document.querySelector('.auth-subtitle');
    const button = document.querySelector('.btn-primary');
    const footer = document.querySelector('.auth-footer');
    
    if (title.textContent === 'Welcome Back') {
        title.textContent = 'Create Account';
        subtitle.textContent = 'Sign up to start building your apps';
        button.textContent = 'Sign Up';
        footer.innerHTML = 'Already have an account? <a href="#" class="auth-link" onclick="toggleAuthForm()">Sign in</a>';
    } else {
        title.textContent = 'Welcome Back';
        subtitle.textContent = 'Sign in to continue building your apps';
        button.textContent = 'Sign In';
        footer.innerHTML = 'Don\'t have an account? <a href="#" class="auth-link" onclick="toggleAuthForm()">Sign up</a>';
    }
}

// Chat functionality
function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addMessage(message, 'user');
    input.value = '';
    
    // Show loading indicator
    const loadingMessage = addMessage('Building your app...', 'bot', true);
    
    // Simulate AI processing
    setTimeout(() => {
        // Remove loading indicator
        loadingMessage.remove();
        
        // Add bot response
        addMessage("I've created your app based on your description. You can now customize it further or publish it!", 'bot');
        
        // Update preview
        updatePreview(message);
    }, 2000);
}

function addMessage(text, sender, isLoading = false) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `message message-${sender} fade-in`;
    
    if (isLoading) {
        messageElement.innerHTML = `<div class="loading"></div> ${text}`;
    } else {
        messageElement.textContent = text;
    }
    
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    return messageElement;
}

function updatePreview(description) {
    const placeholder = document.getElementById('preview-placeholder');
    const preview = document.getElementById('app-preview');
    
    placeholder.style.display = 'none';
    preview.style.display = 'block';
    
    // Generate a simple preview based on the description
    let previewHTML = `
        <div style="max-width: 800px; margin: 0 auto; font-family: Arial, sans-serif;">
            <header style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 4rem 2rem; text-align: center;">
                <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">Your Generated App</h1>
                <p style="font-size: 1.2rem; max-width: 600px; margin: 0 auto;">Based on your description: "${description}"</p>
                <button style="background: white; color: #667eea; border: none; padding: 0.75rem 1.5rem; border-radius: 4px; font-weight: bold; margin-top: 2rem; cursor: pointer;">Get Started</button>
            </header>
            
            <section style="padding: 4rem 2rem; text-align: center;">
                <h2 style="font-size: 2rem; margin-bottom: 2rem;">Features</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
                    <div style="padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <i class="fas fa-rocket" style="font-size: 2rem; color: #667eea; margin-bottom: 1rem;"></i>
                        <h3 style="margin-bottom: 1rem;">Fast Performance</h3>
                        <p>Lightning fast loading times and smooth interactions.</p>
                    </div>
                    <div style="padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <i class="fas fa-mobile-alt" style="font-size: 2rem; color: #667eea; margin-bottom: 1rem;"></i>
                        <h3 style="margin-bottom: 1rem;">Responsive Design</h3>
                        <p>Looks great on all devices from mobile to desktop.</p>
                    </div>
                    <div style="padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <i class="fas fa-cog" style="font-size: 2rem; color: #667eea; margin-bottom: 1rem;"></i>
                        <h3 style="margin-bottom: 1rem;">Easy Customization</h3>
                        <p>Change colors, text, and layout with simple commands.</p>
                    </div>
                </div>
            </section>
            
            <footer style="background: #f8f9fa; padding: 2rem; text-align: center;">
                <p>© 2023 Your Generated App. Built with BuildFlow.</p>
            </footer>
        </div>
    `;
    
    preview.innerHTML = previewHTML;
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener for Enter key in chat input
    document.getElementById('chat-input').addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
});
