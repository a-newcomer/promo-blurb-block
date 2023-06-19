// import wordpress translation magic
import { __ } from '@wordpress/i18n';
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
 export default function save({ attributes }) {
	
	const blockProps = useBlockProps.save({
		className: 'afn-blurb-wrapper',
	});
	const { content, title, align, backgroundColor, textColor, kaLink, linkLabel, hasLinkNofollow } = attributes;

	const className = blockProps.className;

	return (
		<section 
			{...blockProps}
				className={ className }
				style={{ backgroundColor: backgroundColor, color: textColor }} 
			>
			<RichText.Content
				style={{ textAlign: align }}
				tagName="h3"
				value={title}
			/>
			<RichText.Content
				tagName="p"
				value={content}
				style={{ textAlign: align }}
			/>
			<p
				style={{ textAlign: align }}
			>
				<a
					href={ kaLink }
					className="btn-primary"
					rel={ hasLinkNofollow ? "nofollow" : "noopener noreferrer" }
				>
					{ linkLabel }
				</a>
			</p>
		</section>
	);
}
