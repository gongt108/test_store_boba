export default {
    name: 'cafe',
    title: 'Cafe Name',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'name',
            title: 'Cafe Name',
            type: 'string',
        },
        {
            name: 'order',
            title: "Order",
            type: 'number'
        }
    ],
};