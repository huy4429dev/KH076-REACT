<?php 
namespace App\Http\Middleware;

use Closure;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        return $request->user();
        $userRole = $request->user()->roles()->orderBy('role_id','desc')->first();
        if ($userRole) {

            // Set scope as admin/moderator based on user role
            $request->request->add([
                'scope' => $userRole->name
            ]);
        }

        return $next($request);
    }
}