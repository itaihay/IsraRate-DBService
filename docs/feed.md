## Feed

`Feed` Endpoint for managaing feeds.

### Endpoint Summary

-   `[GET]` /api/feeds - [Retrieve All *Feeds*](#Retrieve-All-Feeds)
-   `[POST]` /api/feed - [Create a new *Feed*](#Create-a-new-Feed)
-   `[GET]` /api/feed/<.id> - [Retrieve a single *Feed* with `id`](#Retrieve-a-single-Feed)
-   `[PUT]` /api/feed/<.id> - [Edit a single *Feed* with `id`](#Edit-a-single-Feed)
-   `[DELETE]` /api/feed/<.id> - [Delete a single *Feed* with `id`](#Delete-a-single-Feed)
-   `[GET]` /api/feeds/search - [Searches all *feeds* for multiple values](#Search-feeds)
-   `[POST]` /api/feeds/search - [Applies Advance search(like ranges, arrays) over *feeds* for multiple values](#Search-feeds)
-   `[GET]` /api/feeds/test - [Quick Test feed](#Quick-Test-feed)
-   `[POST]` /api/feeds - [Create bulk *Feed*](#Create-bulk-Feed)
-   `[PUT]` /api/feeds - [Edits bulk *Feed* with conditions](#Edit-bulk-Feed)
-   `[DELETE]` /api/feeds - [Delete bulk *feeds* in the collection](#Delete-bulk-feeds)




**N.B**: The `/test` endpoint of this feed is for quick development testing only. Do Disable this when in production!

### SDK Summary

    - Unity >= 5
    - Angular >= 4.3

The SDKs have provider code already set

### Retrieve All Feeds

-   **Syntax** : `[GET] /api/feeds [?skip= X & limit= Y]`
-   **URL** : `/api/feeds`
-   **Method**: `GET`
-   **URL Params**:  
     **Required:** None  
     **Optional:**

    `skip=[Integer]` - Offsets(Skips) index of results  
     `limit=[Integer]` - Total number of results in the current request to return

-   **Success Response:**

    **Code:** 200 <br />
    **Content:**

    ```
    {
      "status": "success",
      "data": {
        "feeds ": [
          {"_id":"56cb91bdc3464f14678934ca","id":"lorem pisum dolor sit amet","user_id":3.5,"created_at":"2019-04-03T08:33:50.339Z","text":"lorem pisum dolor sit amet","place":"lorem pisum dolor sit amet","geo":"lorem pisum dolor sit amet","likes":3.5,"comments":3.5},
          .
          .
          .
        ],
        "count": 1
      },
      "message": null
    }
    ```

-   **Sample Call:**

    `curl "http://localhost:3000/api/feeds"`  
    Fetches 5 feed results skipping the first 2

-   **Notes:**

### Create a new Feed

-   **Syntax** : `[POST] /api/feed`
-   **URL** : `/api/feed`
-   **Method**: `POST`
-   **URL Params**:  
     **Optional:** None  
     **Required:**

    `{feed:{}}` - The base feed data object

    ```
     {
       "feed" : {
        {"_id":"56cb91bdc3464f14678934ca","id":"lorem pisum dolor sit amet","user_id":3.5,"created_at":"2019-04-03T08:33:50.339Z","text":"lorem pisum dolor sit amet","place":"lorem pisum dolor sit amet","geo":"lorem pisum dolor sit amet","likes":3.5,"comments":3.5}
       }
     }
    ```

-   **Success Response:**

    **Code:** 201  
     **Content:**

    ```
      {
        "status": "success",
        "data": {
          "__v": 0,
          "_id": "58713aaf1657a2bd9c5a00e0",
          id :  String, 
          user_id :  Number, 
          created_at :  Date, 
          text :  String, 
          place :  String, 
          geo : String, 
          likes :  Number, 
          comments :  Number
          
        },
        "message": null
      }
    ```

-   **Error Response:**

    **Code:** 500 <br />
    **Content:**

    ```
      {
        "status": "error",
        "data": "Invalid feed/key model provided",
        "message": "There was an error saving this data."
      }
    ```

-   **Sample Call:**

    ```
        curl -X POST -H "Content-Type: application/json"
          -H "Cache-Control: no-cache" -d     '{
          "feed":{
              "name":"pen",
              "price":2.54
              }
          }' "http://localhost:3000/api/feed"

    ```

    The key model being `feed` the saves a 'pen' data

-   **Notes:**

### Retrieve a single Feed

-   **Syntax** : `[GET] /api/feed/:id`
-   **URL** : `/api/feed/:id`
-   **Method**: `GET`
-   **URL Params**:  
     **Optional:** None  
     **Required:**

    `id` - The object id of the feed  


-   **Success Response:**

    **Code:** 200  
     **Content:**

    ```
      {
        "status": "success",
        "data": {
          "_id": "587100001657a2bd9c5a00df",
          "__v": 0,
          id :  String, 
          user_id :  Number, 
          created_at :  Date, 
          text :  String, 
          place :  String, 
          geo : String, 
          likes :  Number, 
          comments :  Number
          
        },
        "message": null
      }
    ```

-   **Error Response:**

    **Code:** 404  
     **Content:**

    ```
      {
        "status": "error",
        "data": 404,
        "message": "Not Found Error"
      }
    ```

-   **Sample Call:**

    ```
        curl -X GET -H "Content-Type: application/json"
          -H "Cache-Control: no-cache"
          "http://localhost:3000/api/feed/587100001657a2bd9c5a00d"

    ```

    Fetches a single feed from the collection `feeds`

-   **Notes:**

### Edit a single Feed

-   **Syntax** : `[PUT] /api/feed/:id`
-   **URL** : `/api/feed/:id`
-   **Method**: `PUT`
-   **URL Params**:  
     **Optional:** None  
     **Required:**

    `id` - The object id of the feed  
     `{feed:{}}` - The base feed data object that needs to be changed

    ```
     {
       "feed" : {
         id :  String, 
         user_id :  Number, 
         created_at :  Date, 
         text :  String, 
         place :  String, 
         geo : String, 
         likes :  Number, 
         comments :  Number
         
       }
     }
    ```

-   **Success Response:**

    **Code:** 202  
     **Content:**

    ```
      {
        "status": "success",
        "data": {
          "_id": "587100001657a2bd9c5a00df",
          "__v": 0,
          id :  String, 
          user_id :  Number, 
          created_at :  Date, 
          text :  String, 
          place :  String, 
          geo : String, 
          likes :  Number, 
          comments :  Number
          
        },
        "message": null
      }
    ```

-   **Error Response:**

    **Code:** 500  
     **Content:**

    ```
      {
        "status": "error",
        "data": "Invalid feed/key model provided",
        "message": "There was an error updating this data."
      }
    ```

    **Code:** 404  
     **Content:**

    ```
    {
      "status": "error",
      "data": 404,
      "message": "No Data Found"
    }
    ```

-   **Sample Call:**

    ```
        curl -X PUT -H "Content-Type: application/json"
          -H "Cache-Control: no-cache"
          -d '{
                "feed22":{
                    "name":"sharpner",
                    "price":2.55
                  }
              }' "http://localhost:3000/api/feed/587100001657a2bd9c5a00df"

    ```

    The key model being `feed` which updates a 'sharpner' data

-   **Notes:**

### Delete a single Feed

-   **Syntax** : `[DELETE] /api/feed/:id`
-   **URL** : `/api/feed/:id`
-   **Method**: `DELETE`
-   **URL Params**:  
     **Optional:** None  
     **Required:**

    `id` - The object id of the feed

-   **Success Response:**

    **Code:** 202  
     **Content:**

    ```
    {
      "status": "success",
      "data": "The feed got Deleted",
      "message": null
    }
    ```

-   **Error Response:**

    **Code:** 500  
     **Content:**

    ```
      {
      "status": "error",
      "data": "Error in deleting this feed",
      "message": {
        .
        .
        .
      }
    }
    ```

-   **Sample Call:**

    ```
      curl -X DELETE "http://localhost:3000/api/feed/58713b0a1657a2bd9c5ad"
    ```

    The key model being `feed` which updates a 'sharpner' data

-   **Notes:**

### Delete all Feeds

-   **Syntax** : `[DELETE] /api/feeds`
-   **URL** : `/api/feeds`
-   **Method**: `DELETE`
-   **URL Params**:  
     **Optional:** None  
     **Required:** None
-   **Success Response:**

    **Code:** 202  
     **Content:**

    ```
     {
       "status": "success",
       "data": "All feeds got Delete",
       "message": null
     }
    ```

-   **Error Response:**

    **Code:** 500  
     **Content:**

    ```
       {
         "status": "error",
         "data": "Error in deleting all feeds",
         "message": {
           .
           .
           .
         }
       }
    ```

-   **Sample Call:**

    ```
      curl -X DELETE "http://localhost:3000/api/feeds"
    ```

    The key model being `feed` which updates a 'sharpner' data

-   **Notes:**

### Search Feeds

-   **Syntax** : `[GET] /api/feeds/search [?skip= X & limit= Y & keyword= field:value [,field:value]]`
-   **URL** : `/api/feeds/search`
-   **Method**: `GET`
-   **URL Params**:  
     **Required:** keyword  
     **Optional:**

    `skip=[Integer]` - Offsets(Skips) index of results  
     `limit=[Integer]` - Total number of results in the current request to return
    `keyword=[CSV]` - keyword = field1:value1, filed2:value2 ...
    `strict=[Boolean]` - Performs Strict search.

-   **Success Response:**

    **Code:** 200 <br />
    **Content:**

    ```
    {
      "status": "success",
      "data": {
        "feeds": [
          {
            "_id": "587100001657a2bd9c5a00df",
            name : String,
        price : Number,
            "__v": 0
          },
          .
          .
          .
        ],
        "count": 1
      },
      "message": null
    }
    ```

-   **Sample Call:**

    `curl "http://localhost:3000/api/feeds/search?keyword=first:Sam,last:Jones"`  
    Searches feeds with rows with its first name 'Sam' and last name 'Jones'

-   **Notes:**
    To use Strict Search, add param ?strict=true
