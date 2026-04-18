# Bus Pass System - Additional Controllers

This document outlines additional controllers needed for complete functionality.

## Controllers to Create

### 1. Bus Controller (`controllers/busController.js`)
```javascript
// Functions:
- getAllBuses()         // Get all buses
- getBusById()          // Get specific bus
- createBus()           // Add new bus (admin)
- updateBus()           // Update bus info (admin)
- deleteBus()           // Delete bus (admin)
- updateBusLocation()   // Real-time location
- getBusAvailability()  // Check availability
```

### 2. Route Controller (`controllers/routeController.js`)
```javascript
// Functions:
- getAllRoutes()        // Get all routes
- getRouteById()        // Get route details
- createRoute()         // Create new route (admin)
- updateRoute()         // Update route (admin)
- deleteRoute()         // Delete route (admin)
- getRouteStops()       // Get stops on route
- searchRoutes()        // Search by origin/destination
```

### 3. Booking Controller (`controllers/bookingController.js`)
```javascript
// Functions:
- createBooking()       // Book a journey
- getUserBookings()     // Get user's bookings
- cancelBooking()       // Cancel booking
- getBookingDetails()   // Get booking info
- updateBookingStatus() // Update status (admin)
- generateTicket()      // Generate ticket with QR
```

### 4. Admin Controller (`controllers/adminController.js`)
```javascript
// Functions:
- getDashboardStats()   // Analytics dashboard
- getUsersStats()       // User statistics
- getRevenueStats()     // Revenue analytics
- getBusStats()         // Bus usage stats
- getSystemLogs()       // System activity logs
- exportReports()       // Export data
```

### 5. Payment Controller (`controllers/paymentController.js`)
```javascript
// Functions:
- createPaymentIntent() // Stripe payment
- handleWebhook()       // Stripe webhook
- getPaymentHistory()   // User payments
- refundPayment()       // Refund payment
- getPaymentStats()     // Payment analytics
```

## Routes to Create

### Bus Routes (`routes/buses.js`)
```
GET    /api/buses              - Get all buses
GET    /api/buses/:id          - Get bus details
POST   /api/buses              - Create bus (admin)
PUT    /api/buses/:id          - Update bus (admin)
DELETE /api/buses/:id          - Delete bus (admin)
PATCH  /api/buses/:id/location - Update location
GET    /api/buses/:id/availability - Check availability
```

### Route Routes (`routes/routes.js`)
```
GET    /api/routes             - Get all routes
GET    /api/routes/:id         - Get route details
POST   /api/routes             - Create route (admin)
PUT    /api/routes/:id         - Update route (admin)
DELETE /api/routes/:id         - Delete route (admin)
GET    /api/routes/search      - Search routes
GET    /api/routes/:id/stops   - Get stops
```

### Booking Routes (`routes/bookings.js`)
```
POST   /api/bookings           - Create booking
GET    /api/bookings           - Get user bookings
GET    /api/bookings/:id       - Get booking details
PUT    /api/bookings/:id       - Update booking
DELETE /api/bookings/:id       - Cancel booking
POST   /api/bookings/:id/ticket - Generate ticket
```

### Admin Routes (`routes/admin.js`)
```
GET    /api/admin/dashboard    - Dashboard stats
GET    /api/admin/users        - User stats
GET    /api/admin/revenue      - Revenue stats
GET    /api/admin/buses        - Bus stats
GET    /api/admin/logs         - System logs
POST   /api/admin/export       - Export reports
```

### Payment Routes (`routes/payments.js`)
```
POST   /api/payments/intent    - Create payment
POST   /api/payments/webhook   - Stripe webhook
GET    /api/payments/history   - Payment history
POST   /api/payments/refund    - Refund payment
GET    /api/payments/stats     - Stats
```

## Implementation Priority

1. **Phase 1** (MVP - Currently Done)
   - Auth ✅
   - Pass Management ✅
   - User Profile ✅

2. **Phase 2** (Essential)
   - Bus Management
   - Route Management
   - Booking System

3. **Phase 3** (Enhanced)
   - Payment Integration
   - Admin Dashboard
   - Analytics

4. **Phase 4** (Advanced)
   - Real-time Tracking
   - Notifications
   - Mobile App

## Integration Checklist

- [ ] Input validation middleware
- [ ] Rate limiting middleware
- [ ] Caching strategy
- [ ] Error handling standardization
- [ ] API documentation (Swagger)
- [ ] Unit tests
- [ ] Integration tests
- [ ] Performance optimization
