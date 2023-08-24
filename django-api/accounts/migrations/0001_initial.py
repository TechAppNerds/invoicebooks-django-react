# Generated by Django 4.0.1 on 2023-01-02 12:17

import accounts.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0016_alter_user_email'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=True)),
                ('role', models.CharField(db_index=True, max_length=15)),
                ('first_name', models.CharField(db_index=True, max_length=150)),
                ('last_name', models.CharField(db_index=True, max_length=150)),
                ('profile_photo', models.CharField(db_index=True, max_length=255)),
                ('email', models.EmailField(db_index=True, max_length=255, unique=True)),
                ('phone_number', models.CharField(db_index=True, max_length=30)),
                ('country', models.CharField(db_index=True, max_length=50)),
                ('time_zone', models.CharField(db_index=True, max_length=50)),
                ('date_joined', models.DateTimeField(auto_now_add=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'User',
                'verbose_name_plural': 'Users',
            },
            managers=[
                ('objects', accounts.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Business',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(db_index=True, max_length=255)),
                ('industry', models.CharField(db_index=True, max_length=50)),
                ('describe', models.CharField(db_index=True, max_length=50)),
                ('base_currency', models.CharField(db_index=True, max_length=100)),
                ('estimated_revenue', models.CharField(db_index=True, max_length=50)),
                ('time_completed_service', models.CharField(db_index=True, max_length=50)),
                ('customer_billing_tool', models.CharField(db_index=True, max_length=50)),
                ('customer_offer_customized_type', models.CharField(db_index=True, max_length=30)),
                ('business_phone', models.CharField(db_index=True, max_length=30)),
                ('mobile_phone', models.CharField(db_index=True, max_length=30)),
                ('country', models.CharField(db_index=True, max_length=50)),
                ('address_1', models.CharField(db_index=True, max_length=255)),
                ('address_2', models.CharField(db_index=True, max_length=255)),
                ('city', models.CharField(db_index=True, max_length=255)),
                ('state', models.CharField(db_index=True, max_length=255)),
                ('zip_code', models.CharField(db_index=True, max_length=20)),
                ('time_zone', models.CharField(db_index=True, max_length=50)),
                ('date_format', models.CharField(db_index=True, max_length=20)),
                ('standard_rate', models.DecimalField(db_index=True, decimal_places=2, max_digits=9)),
                ('owner', models.ForeignKey(db_column='owner_id', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
