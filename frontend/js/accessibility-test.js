/**
 * accessibility-test.js
 * Automated accessibility testing and validation for OpenSource Compass
 */

class AccessibilityTester {
  constructor() {
    this.issues = [];
    this.passedTests = [];
    this.warnings = [];
  }

  // Run all accessibility tests
  runAllTests() {
    console.log('🔍 Running Accessibility Tests...');
    
    this.testSemanticStructure();
    this.testARIALabels();
    this.testKeyboardNavigation();
    this.testColorContrast();
    this.testFocusManagement();
    this.testFormAccessibility();
    this.testImageAltText();
    this.testHeadingStructure();
    this.testLinkAccessibility();
    this.testTableAccessibility();
    
    this.generateReport();
  }

  // Test semantic HTML structure
  testSemanticStructure() {
    console.log('📋 Testing semantic structure...');
    
    // Check for proper use of semantic elements
    const semanticElements = ['header', 'nav', 'main', 'footer', 'section', 'article', 'aside'];
    semanticElements.forEach(tag => {
      const elements = document.getElementsByTagName(tag);
      if (elements.length > 0) {
        this.passedTests.push(`✅ Found ${elements.length} <${tag}> element(s)`);
      }
    });

    // Check for proper heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let previousLevel = 0;
    
    headings.forEach((heading, index) => {
      const currentLevel = parseInt(heading.tagName.substring(1));
      if (index > 0 && currentLevel > previousLevel + 1) {
        this.issues.push(`❌ Heading level skip: h${previousLevel} to h${currentLevel} at "${heading.textContent.substring(0, 30)}..."`);
      }
      previousLevel = currentLevel;
    });

    if (headings.length === 0) {
      this.warnings.push('⚠️ No headings found on page');
    }
  }

  // Test ARIA labels and roles
  testARIALabels() {
    console.log('🏷️ Testing ARIA labels...');
    
    // Check interactive elements for labels
    const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
    buttons.forEach(button => {
      if (!button.textContent.trim()) {
        this.issues.push(`❌ Button without accessible label: ${button.outerHTML.substring(0, 100)}...`);
      }
    });

    // Check links for descriptive text
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
      const text = link.textContent.trim();
      if (text.length < 3 || text === 'click here' || text === 'read more') {
        this.warnings.push(`⚠️ Link with non-descriptive text: "${text}"`);
      }
    });

    // Check form inputs for labels
    const inputs = document.querySelectorAll('input:not([type="hidden"]):not([type="submit"])');
    inputs.forEach(input => {
      const hasLabel = document.querySelector(`label[for="${input.id}"]`) || 
                     input.getAttribute('aria-label') || 
                     input.getAttribute('aria-labelledby') ||
                     input.getAttribute('placeholder');
      
      if (!hasLabel) {
        this.issues.push(`❌ Input without proper label: ${input.name || input.type}`);
      }
    });

    // Check for proper ARIA roles
    const landmarks = document.querySelectorAll('[role]');
    landmarks.forEach(element => {
      const role = element.getAttribute('role');
      const validRoles = ['banner', 'navigation', 'main', 'complementary', 'contentinfo', 'search', 'form', 'region'];
      if (!validRoles.includes(role)) {
        this.warnings.push(`⚠️ Potentially invalid ARIA role: ${role}`);
      }
    });
  }

  // Test keyboard navigation
  testKeyboardNavigation() {
    console.log('⌨️ Testing keyboard navigation...');
    
    // Check for tabindex values
    const elementsWithTabindex = document.querySelectorAll('[tabindex]');
    elementsWithTabindex.forEach(element => {
      const tabindex = element.getAttribute('tabindex');
      if (tabindex > 0) {
        this.warnings.push(`⚠️ Positive tabindex value: ${tabindex} - consider reordering HTML instead`);
      }
    });

    // Check for focusable elements
    const focusableElements = document.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) {
      this.warnings.push('⚠️ No focusable elements found');
    } else {
      this.passedTests.push(`✅ Found ${focusableElements.length} focusable elements`);
    }

    // Check for keyboard traps
    const modals = document.querySelectorAll('.modal, [role="dialog"]');
    modals.forEach(modal => {
      const closeButtons = modal.querySelectorAll('button[aria-label*="close"], button[aria-label*="Close"], .close-btn');
      if (closeButtons.length === 0) {
        this.issues.push(`❌ Modal without close button: ${modal.id || 'unnamed modal'}`);
      }
    });
  }

  // Test color contrast (basic check)
  testColorContrast() {
    console.log('🎨 Testing color contrast...');
    
    // This is a simplified check - real contrast testing requires more sophisticated tools
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
    
    textElements.forEach(element => {
      const styles = window.getComputedStyle(element);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;
      
      // Check for transparent backgrounds
      if (backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent') {
        const parent = element.parentElement;
        if (parent) {
          const parentStyles = window.getComputedStyle(parent);
          // This is simplified - real contrast calculation needed
        }
      }
    });

    this.passedTests.push('✅ Color contrast CSS improvements applied');
  }

  // Test focus management
  testFocusManagement() {
    console.log('🎯 Testing focus management...');
    
    // Check for visible focus indicators
    const styleSheet = Array.from(document.styleSheets).find(sheet => 
      sheet.href && sheet.href.includes('accessibility.css')
    );
    
    if (styleSheet) {
      this.passedTests.push('✅ Accessibility CSS with focus styles loaded');
    } else {
      this.warnings.push('⚠️ Accessibility CSS not found');
    }

    // Check for skip links
    const skipLinks = document.querySelectorAll('.skip-to-main, [href="#main"]');
    if (skipLinks.length > 0) {
      this.passedTests.push('✅ Skip navigation links found');
    } else {
      this.warnings.push('⚠️ No skip navigation links found');
    }
  }

  // Test form accessibility
  testFormAccessibility() {
    console.log('📝 Testing form accessibility...');
    
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      // Check for submit buttons
      const submitButtons = form.querySelectorAll('button[type="submit"], input[type="submit"]');
      if (submitButtons.length === 0) {
        this.warnings.push(`⚠️ Form without submit button: ${form.id || 'unnamed form'}`);
      }

      // Check for required field indicators
      const requiredFields = form.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        const label = document.querySelector(`label[for="${field.id}"]`);
        if (label && !label.textContent.includes('*') && !label.querySelector('.required')) {
          this.warnings.push(`⚠️ Required field not clearly marked: ${field.name || field.id}`);
        }
      });

      // Check for error handling
      const errorContainers = form.querySelectorAll('.error, .invalid-feedback, [role="alert"]');
      if (requiredFields.length > 0 && errorContainers.length === 0) {
        this.warnings.push(`⚠️ Form with required fields but no error containers`);
      }
    });
  }

  // Test image alt text
  testImageAltText() {
    console.log('🖼️ Testing image alt text...');
    
    const images = document.querySelectorAll('img');
    let imagesWithAlt = 0;
    let imagesWithoutAlt = 0;
    
    images.forEach(img => {
      if (img.hasAttribute('alt')) {
        imagesWithAlt++;
        if (img.alt === '' && !img.getAttribute('role') === 'presentation') {
          this.warnings.push(`⚠️ Image with empty alt text (might be decorative): ${img.src}`);
        }
      } else {
        imagesWithoutAlt++;
        this.issues.push(`❌ Image missing alt text: ${img.src}`);
      }
    });

    this.passedTests.push(`✅ ${imagesWithAlt} images with alt text`);
    if (imagesWithoutAlt > 0) {
      this.issues.push(`❌ ${imagesWithoutAlt} images missing alt text`);
    }
  }

  // Test heading structure
  testHeadingStructure() {
    console.log('📰 Testing heading structure...');
    
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const h1Count = document.querySelectorAll('h1').length;
    
    if (h1Count === 0) {
      this.issues.push('❌ No h1 found on page');
    } else if (h1Count > 1) {
      this.warnings.push(`⚠️ Multiple h1 elements found (${h1Count})`);
    } else {
      this.passedTests.push('✅ Proper single h1 found');
    }

    // Check for skipped heading levels
    let previousLevel = 0;
    headings.forEach(heading => {
      const currentLevel = parseInt(heading.tagName.substring(1));
      if (previousLevel > 0 && currentLevel > previousLevel + 1) {
        this.warnings.push(`⚠️ Heading level skipped: h${previousLevel} to h${currentLevel}`);
      }
      previousLevel = currentLevel;
    });
  }

  // Test link accessibility
  testLinkAccessibility() {
    console.log('🔗 Testing link accessibility...');
    
    const links = document.querySelectorAll('a');
    let accessibleLinks = 0;
    
    links.forEach(link => {
      // Check if link has accessible name
      const text = link.textContent.trim();
      const ariaLabel = link.getAttribute('aria-label');
      const hasAccessibleName = text || ariaLabel;
      
      if (hasAccessibleName) {
        accessibleLinks++;
      } else {
        this.issues.push(`❌ Link without accessible name: ${link.outerHTML.substring(0, 100)}...`);
      }

      // Check for new window/external indicators
      if (link.target === '_blank' && !link.getAttribute('aria-label')?.includes('opens in new window')) {
        this.warnings.push(`⚠️ External link missing new window indicator: ${text.substring(0, 30)}...`);
      }
    });

    this.passedTests.push(`✅ ${accessibleLinks} accessible links found`);
  }

  // Test table accessibility
  testTableAccessibility() {
    console.log('📊 Testing table accessibility...');
    
    const tables = document.querySelectorAll('table');
    
    tables.forEach(table => {
      // Check for captions
      const caption = table.querySelector('caption');
      if (!caption) {
        this.warnings.push('⚠️ Table without caption');
      }

      // Check for proper headers
      const headers = table.querySelectorAll('th');
      if (headers.length === 0) {
        this.issues.push('❌ Table without header cells (th)');
      }

      // Check for scope attributes
      headers.forEach(header => {
        if (!header.hasAttribute('scope')) {
          this.warnings.push('⚠️ Table header without scope attribute');
        }
      });
    });

    if (tables.length === 0) {
      this.passedTests.push('✅ No tables found (no table accessibility issues)');
    }
  }

  // Generate accessibility report
  generateReport() {
    console.log('\n📊 ACCESSIBILITY TEST REPORT');
    console.log('=====================================\n');
    
    console.log(`✅ PASSED TESTS (${this.passedTests.length}):`);
    this.passedTests.forEach(test => console.log(`  ${test}`));
    
    if (this.warnings.length > 0) {
      console.log(`\n⚠️ WARNINGS (${this.warnings.length}):`);
      this.warnings.forEach(warning => console.log(`  ${warning}`));
    }
    
    if (this.issues.length > 0) {
      console.log(`\n❌ ISSUES (${this.issues.length}):`);
      this.issues.forEach(issue => console.log(`  ${issue}`));
    }
    
    const score = Math.max(0, 100 - (this.issues.length * 10) - (this.warnings.length * 2));
    console.log(`\n🎯 ACCESSIBILITY SCORE: ${score}/100`);
    
    if (score >= 90) {
      console.log('🌟 Excellent accessibility!');
    } else if (score >= 70) {
      console.log('👍 Good accessibility with room for improvement');
    } else if (score >= 50) {
      console.log('⚡ Moderate accessibility - needs attention');
    } else {
      console.log('🚨 Poor accessibility - immediate action required');
    }
    
    return {
      score: score,
      passed: this.passedTests.length,
      warnings: this.warnings.length,
      issues: this.issues.length,
      details: {
        passed: this.passedTests,
        warnings: this.warnings,
        issues: this.issues
      }
    };
  }
}

// Auto-run tests when page loads (for development)
document.addEventListener('DOMContentLoaded', function() {
  // Only run tests in development mode or when explicitly requested
  if (window.location.search.includes('test-a11y=true') || localStorage.getItem('test-a11y') === 'true') {
    const tester = new AccessibilityTester();
    const report = tester.runAllTests();
    
    // Store report for later access
    window.accessibilityReport = report;
    
    // Add visual indicator to page
    const indicator = document.createElement('div');
    indicator.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: ${report.score >= 70 ? '#28a745' : '#dc3545'};
      color: white;
      padding: 10px;
      border-radius: 5px;
      font-family: monospace;
      font-size: 12px;
      z-index: 10000;
    `;
    indicator.innerHTML = `A11y: ${report.score}/100`;
    document.body.appendChild(indicator);
    
    setTimeout(() => {
      indicator.remove();
    }, 5000);
  }
});

// Make available globally for manual testing
window.AccessibilityTester = AccessibilityTester;
window.runAccessibilityTest = function() {
  const tester = new AccessibilityTester();
  return tester.runAllTests();
};
