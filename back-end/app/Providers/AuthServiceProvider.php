<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\User;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        // Define roles and permissions
        Gate::define('read-story', function (User $user) {
            return $user->type === 'reader' || $user->type === 'writer' || $user->type === 'admin';
        });

        Gate::define('write-story', function (User $user) {
            return $user->type === 'writer' || $user->type === 'admin';
        });

        Gate::before(function (User $user, $ability) {
            if ($user->type === 'admin') {
                return true; // Admins can do anything
            }
        });
    }
}