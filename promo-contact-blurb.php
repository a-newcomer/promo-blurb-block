<?php
/**
 * Plugin Name:       Promo Contact Blurb
 * Description:       Block to add to the bottom of posts and pages with a promo blurb and link to make it easy for customers to get in touch.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            a-newcomer on the base of work by the WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       promo-contact-blurb
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function afn_promo_contact_blurb_block_init() {

	if ( ! function_exists( 'register_block_type' ) ) {
		// Gutenberg is not active.
		return;
	}
	// Register the block by passing the location of block.json to register_block_type.
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'afn_promo_contact_blurb_block_init' );
