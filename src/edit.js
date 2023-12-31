/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { 
		useBlockProps, 
		RichText, 
		AlignmentControl, 
		BlockControls,
		InspectorControls,
		PanelColorSettings
} from '@wordpress/block-editor';

import {
	TextControl,
	PanelBody,
	PanelRow,
	ToggleControl,
	ExternalLink
} from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
 export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps( {
		className: 'afn-blub-edit',
	} );

	const { content, title, align, backgroundColor, textColorr, textColor, kaLink, linkLabel, hasLinkNofollow } = attributes;

	const onChangeContent = (newContent) => {
		setAttributes({ content: newContent });
	};
	const onChangeTitle = (newTitle) => {
		setAttributes({title: newTitle})
	}

	const onChangeAlign = (newAlign) => {
		setAttributes({align: newAlign === undefined? 'none' : newAlign})
	}
	console.log(align)
	const onChangeBackgroundColor = ( newBackgroundColor ) => {
		setAttributes( { backgroundColor: newBackgroundColor } )
	}
	
	const onChangeTextColor = ( newTextColor ) => {
		setAttributes( { textColor: newTextColor } )
	}
	const onChangeKaLink = ( newKaLink ) => {
		setAttributes( { kaLink: newKaLink === undefined ? '' : newKaLink } )
	}
	
	const onChangeLinkLabel = ( newLinkLabel ) => {
		setAttributes( { linkLabel: newLinkLabel === undefined ? '' : newLinkLabel } )
	}
	
	const toggleNofollow = () => {
		setAttributes( { hasLinkNofollow: ! hasLinkNofollow } )
	}

	return (
		<>
			<InspectorControls>
				<PanelColorSettings
					title={ __('Color Settings', 'afn')}
					initialOpen={false}
					colorSettings={ [
						{
							value: textColor,
							onChange: onChangeTextColor,
							label: __( 'Text Color', 'afn')
						},
						{
							value: backgroundColor,
							onChange: onChangeBackgroundColor,
							label: __( 'Background Color', 'afn')
						}
					]}
				/>
				<PanelBody
					title={ __( 'Link Settings' )}
					initialOpen={true}
				>
					<PanelRow>
						<fieldset>
							<TextControl
								label={__( 'Link URL', 'afn' )}
								value={ kaLink }
								onChange={ onChangeKaLink }
								help={ __( 'i.e. https://...', 'afn' )}
							/>
						</fieldset>
					</PanelRow>
					<PanelRow>
						<fieldset>
							<TextControl
								label={__( 'Link Label', 'afn' )}
								value={ linkLabel }
								onChange={ onChangeLinkLabel }
								help={ __( 'Add link label', 'afn' )}
							/>
						</fieldset>
					</PanelRow>
					<PanelRow>
						<fieldset>
							<ToggleControl
								label="Add rel = nofollow"
								help={
									hasLinkNofollow
										? 'Has rel nofollow.'
										: 'No rel nofollow.'
								}
								checked={ hasLinkNofollow }
								onChange={ toggleNofollow }
							/>
						</fieldset>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<AlignmentControl value={ align } onChange={ onChangeAlign } />
			</BlockControls>
				<div 
				{ ...blockProps }
					style={ { backgroundColor: backgroundColor, color: textColor } }>
					<RichText
						tagName="h3"
						value={ title }
						allowedFormats={ ['core/bold', 'core/italic']}
						onChange={ onChangeTitle }
						placeholder={ __( 'Enter Blurb Title Here...', 'afn' ) }
						style={ { textAlign: align, color: textColor } }
					/>
					<RichText
						tagName="p"
						value={ content }
						allowedFormats={ ['core/bold', 'core/italic']}
						onChange={ onChangeContent }
						placeholder={ __( 'Enter Blurb text Here...', 'afn' ) }
						style={ { textAlign: align, color: textColor } }
					/>
					<p
						style={ { textAlign: align } }
					>
						<ExternalLink 
							href={ kaLink }
							className="btn-primary"
							rel={ hasLinkNofollow ? "nofollow" : "" }
						>
								{ linkLabel }
						</ExternalLink>
					</p>
				</div>
		</>

	);
}