# API Endpoint Documentation

## POST /login
**Description:** Performs user authentication.  
**Authentication:** Public (no authentication required).  
**Body:** User authentication data (e.g., username and password).  
**Response:** Returns an authentication token on success.

## POST /user
**Description:** Creates a new user.  
**Authentication:** Requires user authentication.  
**Body:** Data required to create a new user.  
**Response:** Returns details of the newly created user.

## GET /me
**Description:** Returns details of the authenticated user.  
**Authentication:** Requires user authentication.  
**Response:** Returns details of the authenticated user.

## POST /stock
**Description:** Creates a new stock.  
**Authentication:** Requires user authentication (admin).  
**Body:** Details of the new stock.  
**Response:** Returns details of the newly created stock.

## GET /stock/Stocks
**Description:** Returns a list of available stocks.  
**Authentication:** Requires user authentication.  
**Response:** Returns a list containing the ID, name, and last update of each stock.

## PATCH /stock/createItem/:id
**Description:** Adds a new item to an existing stock.  
**Authentication:** Requires user authentication.  
**Parameters:** ID of the stock to which the item will be added.  
**Body:** Details of the new item.  
**Response:** Returns the updated details of the stock.

## PATCH /stock/modifyItem/:stockId/:itemId
**Description:** Modifies the details of an item in a stock.  
**Authentication:** Requires user authentication.  
**Parameters:** Stock ID and item ID to be modified.  
**Body:** New details of the item.  
**Response:** Returns the updated details of the stock after modifying the item.

This documentation provides an overview of the available endpoints in the application and their respective functionalities. Make sure to follow the authentication guidelines to access specific endpoints.
