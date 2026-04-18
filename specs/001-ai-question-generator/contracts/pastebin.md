# Pastebin API Contract

## POST to Pastebin

**Endpoint**: `https://pastebin.com/api/api_post.php`

**Content-Type**: `application/x-www-form-urlencoded`

**Request Fields**:
| Field | Value | Required |
|-------|-------|----------|
| api_dev_key | YOUR_PASTEBIN_API_KEY | Yes |
| api_option | paste | Yes |
| api_paste_code | TEXT_TO_POST | Yes |
| api_paste_name | Title (optional) | No |
| api_paste_private | 0 (public) or 1 (unlisted) | No |
| api_paste_expire_date | N (never), 1H, 1D, 1W, 2W, 1M | No |
| api_paste_format | text, markdown, etc. | No |

**Request Example**:
```
api_dev_key=YOUR_DEV_KEY&api_option=paste&api_paste_code=Question+1%0AQuestion+2&api_paste_name=Hygge+Questions+for+Net
```

**Success Response**:
```
https://pastebin.com/abc123
```

**Error Response**:
```
Bad API request, reason: ...
```

## Usage in App

1. User clicks "Share to Pastebin" button
2. App formats questions as numbered list
3. App POSTs to Pastebin API
4. App displays returned URL for user to copy/share

## Obtaining a Pastebin API Key

1. Create account at https://pastebin.com
2. Visit https://pastebin.com/doc_api
3. Click "Your API Key" to get your developer key