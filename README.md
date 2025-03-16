# Custom Block Attributes

A WordPress plugin that allows users to add custom HTML attributes to any block in the WordPress Block Editor (Gutenberg).

![WordPress](https://img.shields.io/badge/WordPress-6.7%2B-blue)
![PHP](https://img.shields.io/badge/PHP-7.4%2B-purple)
![License](https://img.shields.io/badge/license-GPL--2.0--or--later-green)

## Description

Custom Block Attributes extends the WordPress Block Editor by adding the ability to set custom HTML attributes on any block. This is particularly useful for developers and advanced users who need to add specific attributes for styling, JavaScript functionality, accessibility, or third-party integrations.

### Features

- Add custom HTML attributes to any WordPress block
- Simple and intuitive user interface in the block inspector panel
- Easily add, edit, and remove custom attributes
- Attributes are saved with the block and rendered on the frontend
- Works with all core and custom blocks

## Installation

### Manual Installation

1. Download the plugin zip file
2. Log in to your WordPress admin panel and navigate to Plugins → Add New
3. Click the "Upload Plugin" button at the top of the page
4. Choose the downloaded zip file and click "Install Now"
5. Activate the plugin through the 'Plugins' menu in WordPress

### Using Composer

```bash
composer require wp-forge/custom-block-attributes
```

## Usage

1. Edit a post or page using the Block Editor
2. Select any block you want to add custom attributes to
3. In the block settings sidebar, scroll down to find the "Custom HTML Attributes" panel
4. Add attribute keys and values as needed
5. The attributes will be applied to the block's HTML output on the frontend

### Example

If you want to add a custom data attribute to a paragraph block:

1. Select the paragraph block
2. Open the "Custom HTML Attributes" panel in the sidebar
3. Enter "data-custom" as the attribute key
4. Enter "value" as the attribute value
5. Click "Add Attribute"

The resulting HTML on the frontend will be:

```html
<p data-custom="value">Your paragraph content</p>
```

## Requirements

- WordPress 6.7 or higher
- PHP 7.4 or higher

## Frequently Asked Questions

### Will this work with all blocks?

Yes, this plugin is designed to work with all WordPress blocks, including core blocks, theme blocks, and blocks from other plugins.

### Can I add any HTML attribute?

Yes, you can add any valid HTML attribute. However, some attributes may be overridden by WordPress or the theme if they conflict with existing attributes.

### Will this affect my site's performance?

The plugin is lightweight and only loads in the admin when editing posts or pages. It has minimal impact on frontend performance.

## Changelog

### 1.0.1
- Fix bug where attributes were applied to all child elements as well

### 1.0.0
- Initial release

## Credits

Developed by [Micah Wood](https://micahwood.me)

## License

This plugin is licensed under the GPL v2 or later.

```
This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License, version 2, as
published by the Free Software Foundation.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA
```

A copy of the license is included in the root of the plugin's directory. The file is named `LICENSE`. 