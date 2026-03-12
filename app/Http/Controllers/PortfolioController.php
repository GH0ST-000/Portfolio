<?php

namespace App\Http\Controllers;

use App\Actions\Portfolio\GetPublishedProjectsAction;
use App\Actions\Portfolio\GetPublishedSkillsAction;
use App\Actions\Portfolio\GetPublishedExperiencesAction;
use App\Actions\Portfolio\GetActivePricingsAction;
use App\Actions\Portfolio\StoreContactAction;
use App\Http\Requests\StoreContactRequest;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function __construct(
        private GetPublishedProjectsAction $getPublishedProjectsAction,
        private GetPublishedSkillsAction $getPublishedSkillsAction,
        private GetPublishedExperiencesAction $getPublishedExperiencesAction,
        private GetActivePricingsAction $getActivePricingsAction,
        private StoreContactAction $storeContactAction
    ) {}

    public function index()
    {
        $projects = $this->getPublishedProjectsAction->execute();
        $skills = $this->getPublishedSkillsAction->execute();
        $experiences = $this->getPublishedExperiencesAction->execute();
        $pricings = $this->getActivePricingsAction->execute();

        return Inertia::render('Portfolio/Index', [
            'projects' => $projects,
            'skills' => $skills,
            'experiences' => $experiences,
            'pricings' => $pricings,
        ]);
    }

    public function interactive3D()
    {
        $projects = $this->getPublishedProjectsAction->execute();
        $experiences = $this->getPublishedExperiencesAction->execute();

        return Inertia::render('Portfolio/Interactive3D', [
            'projects' => $projects,
            'experiences' => $experiences,
        ]);
    }

    public function cinematicJourney()
    {
        $experiences = $this->getPublishedExperiencesAction->execute('start_date', 'asc');
        $projects = $this->getPublishedProjectsAction->execute();

        return Inertia::render('Portfolio/CinematicJourney', [
            'experiences' => $experiences,
            'projects' => $projects,
        ]);
    }

    public function storeContact(StoreContactRequest $request)
    {
        $this->storeContactAction->execute($request->validated());

        return back()->with('success', 'Thank you for your message! I will get back to you soon.');
    }
}
