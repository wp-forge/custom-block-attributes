<?php
/**
 * Plugin Name: Custom Block Attributes
 * Description: Allow users to add custom HTML attributes to blocks in the Block Editor.
 * Version: 1.0
 * Author: Micah Wood
 * Author URI: https://micahwood.me
 * Requires at least: 6.7
 * Requires PHP: 7.4
 * License: GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: custom-block-attributes
 *
 * @package custom-block-attributes
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

define( 'CUSTOM_BLOCK_ATTRIBUTES_VERSION', '1.0' );

/**
 * Enqueue the script for the block editor.
 */
function custom_block_attributes_enqueue_script() {
	wp_enqueue_script(
		'custom-block-attributes-script',
		plugins_url( 'custom-block-attributes.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element', 'wp-editor' ),
		CUSTOM_BLOCK_ATTRIBUTES_VERSION,
		array(
			'in_footer' => true,
		)
	);
}
add_action( 'enqueue_block_editor_assets', 'custom_block_attributes_enqueue_script' );

/**
 * Save custom attributes to the block.
 *
 * @param array $attributes The block attributes.
 * @return array The modified attributes.
 */
function custom_block_attributes_save( $attributes ) {
	// If custom HTML attributes are set, save them
	if ( isset( $attributes['customAttributes'] ) && is_array( $attributes['customAttributes'] ) ) {
		$attributes['customAttributes'] = array_map( 'sanitize_text_field', $attributes['customAttributes'] );
	}
	return $attributes;
}
add_filter( 'block_editor_save_post', 'custom_block_attributes_save' );

/**
 * Add custom attributes to the block's frontend rendering.
 *
 * @param string $content The block content.
 * @param array  $block The block object.
 * @return string The modified content.
 */
function custom_block_attributes_render( $content, $block ) {
	if ( isset( $block['attrs']['customAttributes'] ) && is_array( $block['attrs']['customAttributes'] ) ) {
		$attributes = '';
		foreach ( $block['attrs']['customAttributes'] as $key => $value ) {
			if ( ! empty( $value ) ) {
				$attributes .= ' ' . esc_attr( $key ) . '="' . esc_attr( $value ) . '"';
			}
		}

		// Only modify the first opening HTML tag to add attributes to the main container
		$content = preg_replace( '/^<([^ >]+)([^>]*)>/', '<$1$2' . $attributes . '>', $content, 1 );
	}

	return $content;
}
add_filter( 'render_block', 'custom_block_attributes_render', 10, 2 );
