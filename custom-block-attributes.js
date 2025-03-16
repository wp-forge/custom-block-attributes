const { addFilter } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;
const { Fragment, createElement } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, TextControl, Button } = wp.components;
const { useState } = wp.element;

// Add custom attribute to all blocks
addFilter(
    'blocks.registerBlockType',
    'custom-attributes/add-attributes',
    function (settings) {
        // Add the custom attribute
        settings.attributes = Object.assign(settings.attributes || {}, {
            customAttributes: {
                type: 'object',
                default: {}
            }
        });
        
        return settings;
    }
);

// Add custom inspector control panel
const withInspectorControls = createHigherOrderComponent(
    function (BlockEdit) {
        return function (props) {
            // Skip if it's not a block that should have these controls
            // You can add conditions here if you only want to target specific blocks
            
            const { attributes, setAttributes } = props;
            const customAttributes = attributes.customAttributes || {};
            
            // State for new attribute inputs
            const [newKey, setNewKey] = useState('');
            const [newValue, setNewValue] = useState('');
            
            const handleChange = function (key, value) {
                const newAttributes = Object.assign({}, customAttributes);
                newAttributes[key] = value;
                setAttributes({ customAttributes: newAttributes });
            };
            
            // Function to add a new attribute
            const addNewAttribute = function() {
                if (newKey.trim()) {
                    const newAttributes = Object.assign({}, customAttributes);
                    newAttributes[newKey] = newValue;
                    setAttributes({ customAttributes: newAttributes });
                    setNewKey('');
                    setNewValue('');
                }
            };
            
            // Function to remove an attribute
            const removeAttribute = function(keyToRemove) {
                const newAttributes = Object.assign({}, customAttributes);
                delete newAttributes[keyToRemove];
                setAttributes({ customAttributes: newAttributes });
            };
            
            return createElement(
                Fragment,
                null,
                createElement(BlockEdit, props),
                createElement(
                    InspectorControls,
                    null,
                    createElement(
                        PanelBody,
                        { 
                            title: "Custom HTML Attributes", 
                            initialOpen: false,
                            className: "custom-html-attributes-panel",
                            priority: "low"  // This ensures it appears at the bottom
                        },
                        customAttributes && Object.keys(customAttributes).map(function (key, index) {
                            return createElement(
                                'div',
                                { key: index, style: { display: 'flex', alignItems: 'flex-end', marginBottom: '8px' } },
                                createElement(
                                    'div',
                                    { style: { flexGrow: 1 } },
                                    createElement(TextControl, {
                                        label: key,
                                        value: customAttributes[key],
                                        onChange: function (value) { handleChange(key, value); },
                                    })
                                ),
                                createElement(Button, {
                                    isDestructive: true,
                                    onClick: function() { removeAttribute(key); },
                                    style: { 
                                        marginLeft: '8px', 
                                        marginBottom: '4px',
                                        width: '24px',
                                        height: '24px',
                                        padding: '0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '24px',
                                        transform: 'translateY(-50%)'
                                    }
                                }, "×")
                            );
                        }),
                        createElement(
                            'div',
                            { style: { marginTop: '16px' } },
                            createElement(TextControl, {
                                label: "New Attribute Key",
                                value: newKey,
                                onChange: function(value) { setNewKey(value); }
                            }),
                            createElement(TextControl, {
                                label: "New Attribute Value",
                                value: newValue,
                                onChange: function(value) { setNewValue(value); }
                            }),
                            createElement(Button, {
                                isPrimary: true,
                                onClick: addNewAttribute
                            }, "Add Attribute")
                        )
                    )
                )
            );
        };
    },
    'withInspectorControls'
);

addFilter(
    'editor.BlockEdit',
    'custom-attributes/with-inspector-controls',
    withInspectorControls,
    100  // Add high priority to ensure it appears at the bottom
);

// Add custom attributes to block HTML
addFilter(
    'blocks.getSaveContent.extraProps',
    'custom-attributes/apply-attributes',
    function (extraProps, blockType, attributes) {
        if (attributes.customAttributes) {
            // Apply all custom attributes to the block's HTML
            Object.keys(attributes.customAttributes).forEach(function(key) {
                extraProps[key] = attributes.customAttributes[key];
            });
        }
        
        return extraProps;
    }
);
