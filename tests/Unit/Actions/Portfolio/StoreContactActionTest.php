<?php

namespace Tests\Unit\Actions\Portfolio;

use App\Actions\Portfolio\StoreContactAction;
use App\Models\Contact;
use Tests\TestCase;

class StoreContactActionTest extends TestCase
{
    public function test_it_creates_a_contact_with_valid_data(): void
    {
        $data = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'subject' => 'Test Subject',
            'message' => 'This is a test message.',
        ];

        $action = new StoreContactAction();
        $contact = $action->execute($data);

        $this->assertInstanceOf(Contact::class, $contact);
        $this->assertEquals('John Doe', $contact->name);
        $this->assertEquals('john@example.com', $contact->email);
        $this->assertEquals('Test Subject', $contact->subject);
        $this->assertEquals('This is a test message.', $contact->message);
        $this->assertDatabaseHas('contacts', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
        ]);
    }

    public function test_it_creates_a_contact_without_subject(): void
    {
        $data = [
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'message' => 'Message without subject.',
        ];

        $action = new StoreContactAction();
        $contact = $action->execute($data);

        $this->assertInstanceOf(Contact::class, $contact);
        $this->assertNull($contact->subject);
        $this->assertEquals('Jane Doe', $contact->name);
    }

    public function test_it_persists_contact_to_database(): void
    {
        $data = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'subject' => 'Inquiry',
            'message' => 'I have a question.',
        ];

        $action = new StoreContactAction();
        $contact = $action->execute($data);

        $this->assertTrue($contact->exists);
        $this->assertNotNull($contact->id);
        $this->assertDatabaseCount('contacts', 1);
    }
}
