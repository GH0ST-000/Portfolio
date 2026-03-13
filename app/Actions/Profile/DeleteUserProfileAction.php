<?php

namespace App\Actions\Profile;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class DeleteUserProfileAction
{
    public function execute(User $user): void
    {
        Auth::logout();

        $user->delete();
    }
}
