<?php

namespace App\Providers;
use Laravel\Passport\Passport;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
        Passport::routes();
        //

         // Mandatory to define Scope

        Passport::tokensCan([
            'admin' => 'Add/Edit/Delete Users',
            'user' => 'Add/Edit Users',
            'shop' => 'List Users'
        ]);

        Passport::setDefaultScope([
            'basic'
        ]);
    }
}
