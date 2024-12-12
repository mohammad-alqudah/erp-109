export const mockCustomers = [
  {
    id: '1',
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com',
    phone_number: '+1234567890'
  },
  {
    id: '2',
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane@example.com',
    phone_number: '+1987654321'
  },
  {
    id: '3',
    first_name: 'Michael',
    last_name: 'Johnson',
    email: 'michael@example.com',
    phone_number: '+1122334455'
  }
];

export const mockActions = [
  {
    id: '1',
    name: 'Welcome Message',
    content: 'Welcome to our store! We appreciate your business.',
    condition: 'New Customer',
    includeSurvey: true,
    createdAt: '2024-03-20T10:30:00Z'
  },
  {
    id: '2',
    name: 'Order Confirmation',
    content: 'Thank you for your order! Your order #{order_id} has been confirmed.',
    condition: 'Order Placed',
    includeSurvey: false,
    createdAt: '2024-03-19T15:45:00Z'
  },
  {
    id: '3',
    name: 'Feedback Request',
    content: 'How was your recent experience with us? We value your feedback!',
    condition: 'Post Purchase',
    includeSurvey: true,
    createdAt: '2024-03-18T09:20:00Z'
  }
];

export const mockMessageHistory = [
  {
    id: '1',
    customer_name: 'John Doe',
    customer_phone: '+1234567890',
    sent_at: '2024-03-20T11:30:00Z'
  },
  {
    id: '2',
    customer_name: 'Jane Smith',
    customer_phone: '+1987654321',
    sent_at: '2024-03-20T11:35:00Z'
  },
  {
    id: '3',
    customer_name: 'Michael Johnson',
    customer_phone: '+1122334455',
    sent_at: '2024-03-20T11:40:00Z'
  }
];