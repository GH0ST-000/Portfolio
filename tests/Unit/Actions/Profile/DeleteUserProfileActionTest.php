<?php

namespace Tests\Unit\Actions\Profile;

use App\Actions\Profile\DeleteUserProfileAction;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class DeleteUserProfileActionTest extends TestCase
{
    public function test_it_deletes_user_from_database(): void
    {
        $user = User::factory()->create(['email' => 'test@example.com']);

        $this->assertDatabaseHas('users', ['email' => 'test@example.com']);

        $action = new DeleteUserProfileAction;
        $action->execute($user);

        $this->assertDatabaseMissing('users', ['email' => 'test@example.com']);
    }

    public function test_it_logs_out_user_before_deletion(): void
    {
        $user = User::factory()->create();
        Auth::login($user);

        $this->assertTrue(Auth::check());
        $this->assertEquals($user->id, Auth::id());

        $action = new DeleteUserProfileAction;
        $action->execute($user);

        $this->assertFalse(Auth::check());
    }

    public function test_it_handles_deletion_of_authenticated_user(): void
    {
        $user = User::factory()->create(['name' => 'User To Delete']);
        $this->actingAs($user);

        $this->assertAuthenticated();

        $action = new DeleteUserProfileAction;
        $action->execute($user);

        $this->assertGuest();
        $this->assertDatabaseMissing('users', ['name' => 'User To Delete']);
    }
}
