<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PricingResource\Pages;
use App\Filament\Resources\PricingResource\RelationManagers;
use App\Models\Pricing;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PricingResource extends Resource
{
    protected static ?string $model = Pricing::class;

    protected static ?string $navigationIcon = 'heroicon-o-currency-dollar';
    
    protected static ?string $navigationLabel = 'Pricing Plans';
    
    protected static ?int $navigationSort = 5;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Basic Information')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('e.g., Hourly, Freelancing, Full Time'),
                        
                        Forms\Components\TextInput::make('subtitle')
                            ->maxLength(255)
                            ->placeholder('e.g., Perfect for small tasks')
                            ->columnSpan(1),
                        
                        Forms\Components\TextInput::make('price')
                            ->required()
                            ->numeric()
                            ->prefix('$')
                            ->step(0.01)
                            ->minValue(0)
                            ->placeholder('0.00'),
                        
                        Forms\Components\Select::make('period')
                            ->required()
                            ->options([
                                'hour' => 'Hour',
                                'week' => 'Week',
                                'month' => 'Month',
                                'project' => 'Project',
                            ])
                            ->default('week'),
                        
                        Forms\Components\Textarea::make('description')
                            ->rows(3)
                            ->columnSpanFull()
                            ->placeholder('Brief description of this pricing plan'),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Features')
                    ->schema([
                        Forms\Components\Repeater::make('features')
                            ->schema([
                                Forms\Components\Hidden::make('id'),
                                Forms\Components\TextInput::make('text')
                                    ->label('Feature')
                                    ->placeholder('e.g., Up to 15 hours per week')
                                    ->required()
                                    ->columnSpanFull(),
                            ])
                            ->addActionLabel('Add Feature')
                            ->defaultItems(1)
                            ->columnSpanFull()
                            ->reorderable()
                            ->collapsible()
                            ->helperText('Add each feature as a separate item')
                            ->mutateDehydratedStateUsing(function ($state) {
                                // Convert from array of objects to array of strings
                                return collect($state)->pluck('text')->filter()->values()->toArray();
                            })
                            ->afterStateHydrated(function ($component, $state) {
                                // Convert from array of strings to array of objects
                                if (is_array($state)) {
                                    $component->state(
                                        collect($state)->map(fn($item) => ['text' => $item])->toArray()
                                    );
                                }
                            }),
                    ])
                    ->description('List all the features included in this pricing plan'),

                Forms\Components\Section::make('Call to Action')
                    ->schema([
                        Forms\Components\TextInput::make('button_text')
                            ->required()
                            ->maxLength(255)
                            ->default('Order Now')
                            ->placeholder('e.g., Order Now, Get Started'),
                        
                        Forms\Components\TextInput::make('button_url')
                            ->maxLength(255)
                            ->placeholder('#contact')
                            ->default('#contact')
                            ->helperText('URL where the button should link to'),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Display Settings')
                    ->schema([
                        Forms\Components\TextInput::make('order')
                            ->required()
                            ->numeric()
                            ->default(0)
                            ->helperText('Lower numbers appear first'),
                        
                        Forms\Components\Toggle::make('recommended')
                            ->label('Mark as Recommended')
                            ->helperText('Highlight this plan as recommended')
                            ->default(false),
                        
                        Forms\Components\Toggle::make('active')
                            ->label('Active')
                            ->helperText('Show this pricing plan on the website')
                            ->default(true),
                    ])
                    ->columns(3),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('order')
                    ->label('#')
                    ->sortable()
                    ->width(50),
                
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->weight('bold')
                    ->description(fn (Pricing $record): string => $record->subtitle ?? ''),
                
                Tables\Columns\TextColumn::make('price')
                    ->money('USD')
                    ->sortable()
                    ->label('Price'),
                
                Tables\Columns\BadgeColumn::make('period')
                    ->colors([
                        'primary' => 'hour',
                        'success' => 'week',
                        'warning' => 'month',
                        'danger' => 'project',
                    ]),
                
                Tables\Columns\IconColumn::make('recommended')
                    ->boolean()
                    ->trueIcon('heroicon-o-star')
                    ->falseIcon('heroicon-o-star')
                    ->trueColor('warning')
                    ->falseColor('gray')
                    ->label('★'),
                
                Tables\Columns\ToggleColumn::make('active')
                    ->label('Active'),
            ])
            ->defaultSort('order')
            ->filters([
                Tables\Filters\TernaryFilter::make('active')
                    ->label('Active Status')
                    ->placeholder('All')
                    ->trueLabel('Active only')
                    ->falseLabel('Inactive only'),
                
                Tables\Filters\TernaryFilter::make('recommended')
                    ->label('Recommended')
                    ->placeholder('All')
                    ->trueLabel('Recommended only')
                    ->falseLabel('Not recommended'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPricings::route('/'),
            'create' => Pages\CreatePricing::route('/create'),
            'edit' => Pages\EditPricing::route('/{record}/edit'),
        ];
    }
}
