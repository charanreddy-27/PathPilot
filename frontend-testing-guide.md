# 🧪 PathPilot Frontend Testing Guide

## Overview
This guide will help you thoroughly test all frontend functionalities to ensure everything works correctly before deployment.

## Prerequisites
- Frontend running on http://localhost:3000
- Backend running on http://localhost:5000
- Both servers should be running simultaneously

## 🚀 Quick Start Testing

### 1. **Basic Navigation Test**
Open http://localhost:3000 and test:

- [ ] **Home Page** loads correctly
- [ ] **Navigation Menu** works (Home, Chat, About, Contact)
- [ ] **Responsive Design** (try different screen sizes)
- [ ] **Logo and branding** displays properly

### 2. **Authentication Flow Test**

#### **Registration Test:**
1. Click "Register" or go to `/register`
2. Fill out the form:
   - Name: "Test User"
   - Email: "test@example.com"
   - Password: "testpass123"
3. Click "Register"
4. **Expected Result:** Should redirect to login or dashboard

#### **Login Test:**
1. Go to `/login`
2. Use the credentials you just created:
   - Email: "test@example.com"
   - Password: "testpass123"
3. Click "Login"
4. **Expected Result:** Should redirect to dashboard or chat

#### **Protected Route Test:**
1. Try to access `/chat` without logging in
2. **Expected Result:** Should redirect to login page
3. Login and try again
4. **Expected Result:** Should allow access

### 3. **Chat Functionality Test**

#### **Basic Chat:**
1. Login and go to `/chat`
2. Send a message: "Hello, I need career advice"
3. **Expected Result:** Should receive a response from the AI

#### **Chat History:**
1. Send multiple messages
2. **Expected Result:** Messages should appear in chat history
3. Refresh the page
4. **Expected Result:** Chat history should persist (if implemented)

#### **Different Message Types:**
Test these messages:
- "What careers are good for someone who likes technology?"
- "I'm interested in healthcare, what should I study?"
- "How do I become a software developer?"
- "What skills do I need for data science?"

### 4. **Career Recommendations Test**

#### **Basic Recommendations:**
1. Go to the career recommendations section
2. Fill out the form:
   - Interests: ["technology", "programming"]
   - Skills: ["Python", "JavaScript"]
   - Experience Level: "Beginner"
3. Submit the form
4. **Expected Result:** Should show career recommendations with match scores

#### **Different Scenarios:**
Test with different combinations:
- **Healthcare Focus:** Interests: ["healthcare", "helping people"], Skills: ["communication", "science"]
- **Creative Focus:** Interests: ["design", "art"], Skills: ["creativity", "communication"]
- **Business Focus:** Interests: ["business", "leadership"], Skills: ["management", "communication"]

### 5. **UI/UX Testing**

#### **Responsive Design:**
- [ ] Test on desktop (1920x1080)
- [ ] Test on tablet (768x1024)
- [ ] Test on mobile (375x667)
- [ ] Check navigation menu on mobile

#### **Visual Elements:**
- [ ] All buttons are clickable
- [ ] Forms have proper validation
- [ ] Loading states work
- [ ] Error messages display correctly
- [ ] Success messages display correctly

#### **Accessibility:**
- [ ] Tab navigation works
- [ ] Form labels are properly associated
- [ ] Color contrast is sufficient
- [ ] Text is readable

### 6. **Error Handling Test**

#### **Network Errors:**
1. Stop the backend server
2. Try to login or use chat
3. **Expected Result:** Should show appropriate error message

#### **Invalid Input:**
1. Try to register with invalid email
2. Try to login with wrong password
3. Try to submit empty forms
4. **Expected Result:** Should show validation errors

#### **API Errors:**
1. Try to access protected routes without token
2. **Expected Result:** Should redirect to login

### 7. **Performance Testing**

#### **Load Times:**
- [ ] Home page loads in < 3 seconds
- [ ] Chat responses come in < 5 seconds
- [ ] Career recommendations load in < 3 seconds

#### **Memory Usage:**
- [ ] No memory leaks during extended use
- [ ] Chat history doesn't cause performance issues

## 🔧 Manual Testing Checklist

### **Authentication**
- [ ] Registration form validation
- [ ] Login form validation
- [ ] Password requirements (if any)
- [ ] Email format validation
- [ ] Duplicate email handling
- [ ] JWT token storage
- [ ] Logout functionality
- [ ] Session persistence

### **Chat Interface**
- [ ] Message input works
- [ ] Send button works
- [ ] Messages display correctly
- [ ] Timestamps show correctly
- [ ] User vs AI message styling
- [ ] Chat history scrolls properly
- [ ] Long messages wrap correctly
- [ ] Emoji support (if implemented)

### **Career Recommendations**
- [ ] Form validation
- [ ] Interest selection works
- [ ] Skills input works
- [ ] Experience level selection
- [ ] Results display correctly
- [ ] Match scores show
- [ ] Career descriptions are readable
- [ ] Results are relevant

### **Navigation & Routing**
- [ ] All links work
- [ ] Browser back/forward works
- [ ] Direct URL access works
- [ ] 404 page exists
- [ ] Loading states work

### **Data Persistence**
- [ ] Login state persists on refresh
- [ ] Chat history persists (if implemented)
- [ ] Form data doesn't persist unnecessarily
- [ ] Settings are saved (if any)

## 🐛 Common Issues to Check

### **CORS Issues:**
- Check browser console for CORS errors
- Ensure backend CORS_ORIGINS includes localhost:3000

### **API Connection:**
- Check Network tab in DevTools
- Verify API calls are going to correct URL
- Check for 404, 500, or other HTTP errors

### **Authentication Issues:**
- Check if JWT tokens are stored correctly
- Verify token expiration handling
- Check for unauthorized access errors

### **UI Issues:**
- Check for console errors
- Verify CSS is loading correctly
- Check for broken images or assets

## 📱 Browser Testing

Test in multiple browsers:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## 🚨 Debugging Tips

### **Browser DevTools:**
1. Open DevTools (F12)
2. Check Console for errors
3. Check Network tab for failed requests
4. Check Application tab for stored data

### **Common Console Commands:**
```javascript
// Check if user is logged in
localStorage.getItem('token')

// Check API URL
console.log(process.env.NEXT_PUBLIC_API_URL)

// Test API connection
fetch('http://localhost:5000/api/health').then(r => r.json()).then(console.log)
```

## ✅ Success Criteria

Your frontend is working correctly if:

1. **All pages load without errors**
2. **Authentication flow works end-to-end**
3. **Chat functionality responds correctly**
4. **Career recommendations provide relevant results**
5. **UI is responsive and accessible**
6. **Error handling works appropriately**
7. **Performance is acceptable**

## 🎯 Next Steps

If all tests pass:
1. ✅ Frontend is ready for deployment
2. ✅ Proceed with deployment guide
3. ✅ Test production deployment

If issues are found:
1. 🔧 Fix the issues
2. 🔄 Re-test the specific functionality
3. ✅ Continue with deployment once resolved

---

**Happy Testing! 🎉** 