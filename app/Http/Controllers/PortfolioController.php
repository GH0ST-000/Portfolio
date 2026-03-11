<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Skill;
use App\Models\Experience;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function index()
    {
        $projects = Project::where('is_published', true)
            ->orderBy('order')
            ->get()
            ->map(function ($project) {
                if ($project->image) {
                    $project->image = asset('storage/' . $project->image);
                }
                return $project;
            });
        
        $skills = Skill::where('is_published', true)
            ->orderBy('order')
            ->get()
            ->groupBy('category');
        
        $experiences = Experience::where('is_published', true)
            ->orderBy('start_date', 'desc')
            ->get()
            ->map(function ($experience) {
                if ($experience->company_logo) {
                    $experience->company_logo = asset('storage/' . $experience->company_logo);
                }
                return $experience;
            });

        return Inertia::render('Portfolio/Index', [
            'projects' => $projects,
            'skills' => $skills,
            'experiences' => $experiences,
        ]);
    }

    public function interactive3D()
    {
        $projects = Project::where('is_published', true)
            ->orderBy('order')
            ->get()
            ->map(function ($project) {
                if ($project->image) {
                    $project->image = asset('storage/' . $project->image);
                }
                return $project;
            });
        
        $experiences = Experience::where('is_published', true)
            ->orderBy('start_date', 'desc')
            ->get()
            ->map(function ($experience) {
                if ($experience->company_logo) {
                    $experience->company_logo = asset('storage/' . $experience->company_logo);
                }
                return $experience;
            });

        return Inertia::render('Portfolio/Interactive3D', [
            'projects' => $projects,
            'experiences' => $experiences,
        ]);
    }

    public function cinematicJourney()
    {
        $experiences = Experience::where('is_published', true)
            ->orderBy('start_date', 'asc') // Oldest first for story
            ->get()
            ->map(function ($experience) {
                if ($experience->company_logo) {
                    $experience->company_logo = asset('storage/' . $experience->company_logo);
                }
                return $experience;
            });

        $projects = Project::where('is_published', true)
            ->orderBy('order')
            ->get()
            ->map(function ($project) {
                if ($project->image) {
                    $project->image = asset('storage/' . $project->image);
                }
                return $project;
            });

        return Inertia::render('Portfolio/CinematicJourney', [
            'experiences' => $experiences,
            'projects' => $projects,
        ]);
    }

    public function storeContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        Contact::create($validated);

        return back()->with('success', 'Thank you for your message! I will get back to you soon.');
    }
}
