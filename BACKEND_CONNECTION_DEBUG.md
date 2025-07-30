# 🔍 Backend Connection Troubleshooting Guide

## 🚨 **Issue: Frontend not connecting to backend**

### **🧪 Step 1: Check Backend URL Configuration**

Your current backend URL: `https://pathpilot-production-0aa5.up.railway.app`

**Test the backend directly:**
1. Open browser and go to: `https://pathpilot-production-0aa5.up.railway.app`
2. Check if you get a response (even an error page means the server is running)

### **🔧 Step 2: Test Backend API Endpoint**

**Test the chat endpoint directly:**
```bash
curl -X POST https://pathpilot-production-0aa5.up.railway.app/chat/message \
  -H "Content-Type: application/json" \
  -d '{"message": "test", "user_id": "test_user", "conversation_history": []}'
```

**Or use Postman/Insomnia:**
- URL: `https://pathpilot-production-0aa5.up.railway.app/chat/message`
- Method: POST
- Headers: `Content-Type: application/json`
- Body: 
```json
{
  "message": "test",
  "user_id": "test_user", 
  "conversation_history": []
}
```

### **🐛 Step 3: Check Common Issues**

#### **A. Backend Server Status**
- Is your Railway deployment running?
- Check Railway dashboard for any deployment errors
- Look at Railway logs for startup issues

#### **B. CORS Issues**
Your backend might be blocking requests from your frontend domain.
Check if backend has CORS configured for: `*.vercel.app`

#### **C. SSL/HTTPS Issues**
Railway uses HTTPS, make sure your backend supports secure connections.

#### **D. API Endpoint Path**
Verify the backend actually has `/chat/message` endpoint available.

### **🔍 Step 4: Debug with Frontend Console**

**Check browser developer tools:**
1. Open your deployed frontend
2. Open DevTools (F12)
3. Go to Console tab
4. Try sending a chat message
5. Look for error messages about backend connection

**Expected console output:**
```
Attempting to connect to backend: https://pathpilot-production-0aa5.up.railway.app
```

**If you see errors like:**
- `CORS error` → Backend CORS issue
- `ERR_NAME_NOT_RESOLVED` → URL is wrong
- `ERR_CONNECTION_REFUSED` → Backend is down
- `404 Not Found` → Wrong endpoint path

### **🛠️ Step 5: Quick Fixes**

#### **Fix 1: Check Railway Backend**
1. Go to Railway dashboard
2. Check if service is "Active"
3. Check recent deployments
4. Review application logs

#### **Fix 2: Test Alternative URL**
Try changing the URL format:
- With `/api` prefix: `https://pathpilot-production-0aa5.up.railway.app/api/chat/message`
- Without subdomain: Check if Railway gave you a different URL

#### **Fix 3: Environment Variables**
Make sure Vercel has the correct environment variable:
- Go to Vercel dashboard → Project Settings → Environment Variables
- Check `NEXT_PUBLIC_API_URL` is set correctly

### **🚀 Step 6: Real-time Debugging**

**Add more logging to frontend:**
```typescript
console.log('Backend URL:', backendUrl)
console.log('Full URL:', `${backendUrl}/chat/message`)
```

**Check what URL is actually being called in the browser Network tab.**

---

## 🎯 **Most Likely Issues:**

1. **Backend is down** - Check Railway dashboard
2. **Wrong endpoint** - Backend might use different path
3. **CORS blocking** - Backend needs to allow your frontend domain
4. **Environment variable not set** - Check Vercel environment variables

## 📞 **Quick Test Commands:**

```bash
# Test if backend is alive
curl https://pathpilot-production-0aa5.up.railway.app

# Test the exact endpoint
curl -X POST https://pathpilot-production-0aa5.up.railway.app/chat/message \
  -H "Content-Type: application/json" \
  -d '{"message":"hello"}'
```

Let me know what you find from these tests! 🔍
