<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckTokenByUrl
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
        if ($request->query('access_token')) {
            return $request->query('access_token');
            $request->headers->set('Authorization', 'Bearer ' . $request->query('access_token'));
        }
        return $next($request);
    }
}
