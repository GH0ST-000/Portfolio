<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Admin\Pricing\DeletePricingAction;
use App\Actions\Admin\Pricing\GetAllPricingsAction;
use App\Actions\Admin\Pricing\StorePricingAction;
use App\Actions\Admin\Pricing\UpdatePricingAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StorePricingRequest;
use App\Http\Requests\Admin\UpdatePricingRequest;
use App\Models\Pricing;
use Inertia\Inertia;

class PricingController extends Controller
{
    public function __construct(
        private GetAllPricingsAction $getAllPricingsAction,
        private StorePricingAction $storePricingAction,
        private UpdatePricingAction $updatePricingAction,
        private DeletePricingAction $deletePricingAction
    ) {}

    public function index()
    {
        $pricings = $this->getAllPricingsAction->execute();

        return Inertia::render('Admin/Pricing/Index', [
            'pricings' => $pricings,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Pricing/Create');
    }

    public function store(StorePricingRequest $request)
    {
        $this->storePricingAction->execute($request->validated());

        return redirect()->route('admin.pricing.index')
            ->with('success', 'Pricing plan created successfully.');
    }

    public function edit(Pricing $pricing)
    {
        return Inertia::render('Admin/Pricing/Edit', [
            'pricing' => $pricing,
        ]);
    }

    public function update(UpdatePricingRequest $request, Pricing $pricing)
    {
        $this->updatePricingAction->execute($pricing, $request->validated());

        return redirect()->route('admin.pricing.index')
            ->with('success', 'Pricing plan updated successfully.');
    }

    public function destroy(Pricing $pricing)
    {
        $this->deletePricingAction->execute($pricing);

        return redirect()->route('admin.pricing.index')
            ->with('success', 'Pricing plan deleted successfully.');
    }
}
