// Detect and fix overflow issues on mobile
document.addEventListener('DOMContentLoaded', function() {
    
    // Function to find elements causing horizontal overflow
    function findOverflowingElements() {
        const viewportWidth = window.innerWidth;
        const bodyWidth = document.body.getBoundingClientRect().width;
        
        // If there's horizontal overflow
        if (bodyWidth > viewportWidth) {
            console.log('Detected horizontal overflow. Body width: ' + bodyWidth + 'px, Viewport width: ' + viewportWidth + 'px');
            
            // Get all elements
            const allElements = document.querySelectorAll('*');
            
            // Check each element
            allElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                // If element is wider than viewport or extends beyond right edge
                if (rect.width > viewportWidth || rect.right > viewportWidth) {
                    console.log('Potential overflow caused by:', element, 
                                'Width:', rect.width + 'px', 
                                'Right edge:', rect.right + 'px',
                                'Element class:', element.className);
                    
                    // Optional: Auto-fix common issues
                    // If it's an image or media element
                    if (element.tagName === 'IMG' || element.tagName === 'VIDEO' || 
                        element.tagName === 'IFRAME' || element.tagName === 'OBJECT') {
                        element.style.maxWidth = '100%';
                        element.style.height = 'auto';
                    }
                    
                    // If it has large padding or margin
                    const style = window.getComputedStyle(element);
                    const horizontalPadding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
                    const horizontalMargin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
                    
                    if (horizontalPadding > 50) {
                        element.style.paddingLeft = 'calc(min(20px, 5%))';
                        element.style.paddingRight = 'calc(min(20px, 5%))';
                    }
                    
                    if (horizontalMargin > 50) {
                        element.style.marginLeft = 'auto';
                        element.style.marginRight = 'auto';
                        element.style.maxWidth = '100%';
                    }
                }
            });
        }
    }
    
    // Run on page load
    findOverflowingElements();
    
    // Also run on resize
    window.addEventListener('resize', findOverflowingElements);
});